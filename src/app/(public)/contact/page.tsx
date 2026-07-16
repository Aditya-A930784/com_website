'use client';

import React, { useState } from 'react';
import { CheckCircle2, Clock, Mail, MapPin, Phone, Send } from 'lucide-react';
import { toast } from 'react-hot-toast';

import PageShell from '@/components/pages/page-shell';
import { useTranslation } from '@/lib/i18n/LanguageContext';
import { cn } from '@/lib/utils/cn';

const mapQuery = 'Chhatrapati Sambhajinagar Municipal Corporation Town Hall';
const mapEmbedUrl = `https://www.google.com/maps?q=${encodeURIComponent(mapQuery)}&output=embed`;
const mapOpenUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapQuery)}`;

export default function PublicContactPage() {
  const { t, locale } = useTranslation();

  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!name.trim()) {
      newErrors.name = locale === 'mr' ? 'नाव आवश्यक आहे' : 'Name is required';
    }

    if (!/^\d{10}$/.test(mobile)) {
      newErrors.mobile =
        locale === 'mr'
          ? '१० अंकी वैध मोबाइल नंबर आवश्यक आहे'
          : 'Valid 10-digit mobile number is required';
    }

    if (email && !/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = locale === 'mr' ? 'वैध ईमेल पत्ता द्या' : 'Provide a valid email';
    }

    if (!message.trim()) {
      newErrors.message = locale === 'mr' ? 'संदेश आवश्यक आहे' : 'Message is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setErrors({});

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, mobile, email, message }),
      });

      const result = await response.json();

      if (!response.ok) {
        if (result.errors) {
          setErrors(result.errors);
        } else {
          setErrors({ form: result.error || 'Unable to submit message.' });
        }

        toast.error(
          locale === 'mr'
            ? 'संदेश पाठवता आला नाही. कृपया पुन्हा प्रयत्न करा.'
            : result.error || 'Unable to submit message.'
        );
        return;
      }

      setSubmitted(true);
      toast.success(
        locale === 'mr' ? 'तुमचा संदेश यशस्वीरित्या पाठवला गेला!' : 'Message sent successfully!'
      );

      setName('');
      setMobile('');
      setEmail('');
      setMessage('');
    } catch {
      setErrors({
        form:
          locale === 'mr'
            ? 'नेटवर्क अडचण आली. कृपया थोड्या वेळाने पुन्हा प्रयत्न करा.'
            : 'Network error. Please try again shortly.',
      });
      toast.error(locale === 'mr' ? 'नेटवर्क अडचण आली.' : 'Network error.');
    } finally {
      setLoading(false);
    }
  };

  const contactDetails = [
    {
      labelMr: 'मुख्य कार्यालय पत्ता',
      labelEn: 'Head Office Address',
      valueMr: 'मुख्य इमारत, टाऊन हॉल, हेड पोस्ट ऑफिसच्या मागे, छत्रपती संभाजी नगर, ४३१००१',
      valueEn:
        'Main Building, Town Hall, Behind Head Post Office, Chhatrapati Sambhaji Nagar, 431001',
      icon: MapPin,
    },
    {
      labelMr: 'संपर्क फोन',
      labelEn: 'Contact Phone',
      valueMr: '+91-1234567890 (प्रशासकीय चौकशी)',
      valueEn: '+91-1234567890 (General Inquiry)',
      icon: Phone,
    },
    {
      labelMr: 'ईमेल पत्ता',
      labelEn: 'Email Address',
      valueMr: 'info@chhsambhajinagarmc.org',
      valueEn: 'info@chhsambhajinagarmc.org',
      icon: Mail,
    },
    {
      labelMr: 'कार्यालयीन वेळ',
      labelEn: 'Office Hours',
      valueMr: 'सोमवार ते शनिवार, सकाळी १०.०० ते सायंकाळी ६.०० (शासकीय सुट्ट्या वगळून)',
      valueEn: 'Monday to Saturday, 10.00 AM to 6.00 PM (Closed on public holidays)',
      icon: Clock,
    },
  ];

  return (
    <PageShell
      eyebrow={t('nav.contact')}
      title={locale === 'mr' ? 'संपर्क माहिती व अभिप्राय' : 'Contact Us & Feedback'}
      description={
        locale === 'mr'
          ? 'महानगरपालिका मुख्यालयाची संपर्क माहिती आणि त्वरित अभिप्राय नोंदणी.'
          : 'Municipal HQ contact information and instant feedback channel.'
      }
    >
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {contactDetails.map((detail) => {
              const Icon = detail.icon;

              return (
                <div
                  key={detail.labelEn}
                  className="space-y-1 rounded-xl border border-gray-200 bg-white p-4 shadow-sm"
                >
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-orange-600">
                    <Icon size={14} aria-hidden />
                    <span>{locale === 'mr' ? detail.labelMr : detail.labelEn}</span>
                  </div>
                  <p className="text-sm font-medium leading-normal text-gray-800">
                    {locale === 'mr' ? detail.valueMr : detail.valueEn}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="relative flex aspect-video flex-col justify-end overflow-hidden rounded-2xl border border-gray-200 bg-gray-100 shadow-sm">
            <iframe
              title="Chhatrapati Sambhajinagar Municipal Corporation location map"
              src={mapEmbedUrl}
              className="absolute inset-0 h-full w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
            <a
              href={mapOpenUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="z-10 flex items-center justify-between border-t border-gray-200 bg-white/95 px-4 py-3 text-xs font-bold text-orange-600 shadow hover:bg-white"
            >
              <span>{locale === 'mr' ? 'गूगल मॅपवर उघडा' : 'Open in Google Maps'}</span>
              <span aria-hidden>→</span>
            </a>
          </div>
        </div>

        <div className="flex flex-col justify-between rounded-2xl border border-gray-200 bg-gray-50 p-6 shadow-sm">
          <div>
            <h3 className="mb-2 text-lg font-bold text-gray-900">
              {locale === 'mr' ? 'अभिप्राय किंवा प्रश्न पाठवा' : 'Send Feedback / Inquiry'}
            </h3>
            <p className="mb-6 text-xs leading-relaxed text-gray-500">
              {locale === 'mr'
                ? 'आपले प्रश्न किंवा अभिप्राय थेट आमच्या कार्यालयाला पाठवण्यासाठी खालील अर्ज भरा.'
                : 'Fill details below to share your suggestions, questions, or issues with our admin office.'}
            </p>

            {submitted ? (
              <div className="my-6 space-y-3 rounded-xl border border-green-200 bg-green-50 p-5 text-center">
                <CheckCircle2 size={36} className="mx-auto text-green-600" />
                <div>
                  <h4 className="text-sm font-bold text-green-900">
                    {locale === 'mr' ? 'अभिप्राय प्राप्त झाला!' : 'Feedback Received!'}
                  </h4>
                  <p className="mt-1 text-xs text-green-700">
                    {locale === 'mr'
                      ? 'लवकरच संबंधित विभागाकडून आपल्याशी संपर्क केला जाईल.'
                      : 'We will review your message and contact you if needed.'}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="min-h-[36px] text-xs font-bold text-orange-600 underline"
                >
                  {locale === 'mr' ? 'दुसरा संदेश पाठवा' : 'Send another message'}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                {errors.form && (
                  <p
                    role="alert"
                    className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700"
                  >
                    {errors.form}
                  </p>
                )}

                <div className="space-y-1">
                  <label className="flex items-center justify-between text-xs font-semibold text-gray-700">
                    <span>
                      {locale === 'mr' ? 'संपूर्ण नाव' : 'Full Name'}{' '}
                      <span className="text-red-500">*</span>
                    </span>
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    className={cn(
                      'min-h-[40px] w-full rounded-lg border bg-white px-3.5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500',
                      errors.name ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-300'
                    )}
                  />
                  {errors.name && (
                    <p role="alert" className="mt-0.5 text-[10px] text-red-600">
                      {errors.name}
                    </p>
                  )}
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-700">
                    {locale === 'mr' ? 'मोबाइल नंबर' : 'Mobile Number'}{' '}
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    maxLength={10}
                    value={mobile}
                    onChange={(event) => setMobile(event.target.value.replace(/\D/g, ''))}
                    placeholder={locale === 'mr' ? '१० अंकी नंबर' : '10 digit number'}
                    className={cn(
                      'min-h-[40px] w-full rounded-lg border bg-white px-3.5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500',
                      errors.mobile ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-300'
                    )}
                  />
                  {errors.mobile && (
                    <p role="alert" className="mt-0.5 text-[10px] text-red-600">
                      {errors.mobile}
                    </p>
                  )}
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-700">
                    {locale === 'mr' ? 'ईमेल आयडी' : 'Email Address'}{' '}
                    <span className="font-normal text-gray-400">
                      {locale === 'mr' ? '(पर्यायी)' : '(Optional)'}
                    </span>
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    className={cn(
                      'min-h-[40px] w-full rounded-lg border bg-white px-3.5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500',
                      errors.email ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-300'
                    )}
                  />
                  {errors.email && (
                    <p role="alert" className="mt-0.5 text-[10px] text-red-600">
                      {errors.email}
                    </p>
                  )}
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-700">
                    {locale === 'mr' ? 'तुमचा संदेश' : 'Your Message'}{' '}
                    <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    rows={4}
                    value={message}
                    onChange={(event) => setMessage(event.target.value)}
                    className={cn(
                      'w-full rounded-lg border bg-white px-3.5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500',
                      errors.message ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-300'
                    )}
                  />
                  {errors.message && (
                    <p role="alert" className="mt-0.5 text-[10px] text-red-600">
                      {errors.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="flex min-h-[44px] w-full items-center justify-center gap-2 rounded-lg bg-orange-600 py-3 text-sm font-bold text-white shadow transition hover:bg-orange-700 disabled:opacity-50"
                >
                  <Send size={14} aria-hidden />
                  <span>
                    {loading
                      ? t('common.loading')
                      : locale === 'mr'
                        ? 'संदेश पाठवा'
                        : 'Send Message'}
                  </span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </PageShell>
  );
}
