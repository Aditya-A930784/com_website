'use client';

import { Card, CardBody } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Facebook, Instagram, Twitter, Youtube, ExternalLink } from 'lucide-react';
import { useTranslation } from '@/lib/i18n/LanguageContext';

const socialLinks = [
  {
    name: 'Facebook',
    icon: Facebook,
    handle: '@csmcmahapalika',
    followers: '25K',
    followersMr: '२५ हजार',
    color: 'from-blue-600 to-blue-700',
    bgColor: 'bg-blue-50',
    url: 'https://www.facebook.com/commr.abdmahapalika',
  },
  {
    name: 'Instagram',
    icon: Instagram,
    handle: '@csmcmahapalika',
    followers: '15K',
    followersMr: '१५ हजार',
    color: 'from-pink-600 to-purple-600',
    bgColor: 'bg-pink-50',
    url: 'https://www.instagram.com/csmcmahapalika/',
  },
  {
    name: 'Twitter / X',
    icon: Twitter,
    handle: '@csmc_official',
    followers: '18K',
    followersMr: '१८ हजार',
    color: 'from-sky-500 to-blue-600',
    bgColor: 'bg-sky-50',
    url: '#',
  },
  {
    name: 'YouTube',
    icon: Youtube,
    handle: 'CSMC Official',
    followers: '10K',
    followersMr: '१० हजार',
    color: 'from-red-600 to-red-700',
    bgColor: 'bg-red-50',
    url: 'https://www.youtube.com/channel/UCfty7aRYvcL3evtdIVytYUg',
  },
];

export default function SocialMediaSection() {
  const { locale } = useTranslation();

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block bg-purple-100 text-purple-600 px-4 py-2 rounded-full text-sm font-medium mb-4">
            {locale === 'mr' ? 'सोशल मिडिया' : 'Social Media'}
          </span>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            {locale === 'mr' ? 'आमच्याशी जुडा' : 'Connect With Us'}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {locale === 'mr'
              ? 'सोशल मिडियावर आमच्या अपडेट्स फॉलो करा आणि सक्रिय नागरिक व्हा'
              : 'Follow our updates on social media and become an active citizen'}
          </p>
        </div>

        {/* Social Media Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {socialLinks.map((social, index) => {
            const Icon = social.icon;
            return (
              <a
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group"
              >
                <Card hover className="h-full text-center">
                  <CardBody className="p-6">
                    <div className={`w-20 h-20 ${social.bgColor} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <div className={`w-16 h-16 bg-gradient-to-br ${social.color} rounded-xl flex items-center justify-center`}>
                        <Icon className="text-white" size={32} />
                      </div>
                    </div>
                    <h3 className="font-bold text-xl text-gray-900 mb-1">{social.name}</h3>
                    <p className="text-gray-600 text-sm mb-2">{social.handle}</p>
                    <div className="inline-flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-full text-sm font-medium text-gray-700 mb-4">
                      <span>{locale === 'mr' ? social.followersMr : social.followers}</span>
                      <span>{locale === 'mr' ? ' फॉलोवर्स' : ' Followers'}</span>
                    </div>
                    <Button
                      size="sm"
                      className={`w-full bg-gradient-to-r ${social.color} hover:opacity-90`}
                    >
                      {locale === 'mr' ? 'फॉलो करा' : 'Follow'}
                      <ExternalLink size={14} className="ml-2" />
                    </Button>
                  </CardBody>
                </Card>
              </a>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-orange-500 to-red-600 rounded-2xl p-8 lg:p-12 text-white text-center">
          <h3 className="text-2xl lg:text-3xl font-bold mb-4">
            {locale === 'mr' ? 'आमच्या समुदायाचा भाग व्हा' : 'Be Part of Our Community'}
          </h3>
          <p className="text-lg text-white/90 mb-6 max-w-2xl mx-auto">
            {locale === 'mr'
              ? 'महानगरपालिकेच्या सर्व अपडेट्स, बातम्या आणि घोषणा मिळवा. आमच्या सोशल मिडिया चॅनेल्सवर आजच फॉलो करा!'
              : 'Get all updates, news and announcements from the Municipal Corporation. Follow our social media channels today!'}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {socialLinks.map((social, index) => {
              const Icon = social.icon;
              return (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-all hover:scale-110"
                >
                  <Icon size={24} />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
