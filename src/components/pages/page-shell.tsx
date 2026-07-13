import type { ReactNode } from 'react';

import { Card, CardBody } from '@/components/ui/card';

interface PageShellProps {
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
}

export default function PageShell({ eyebrow, title, description, children }: PageShellProps) {
  return (
    <div className="min-h-screen bg-slate-50">
      <section className="py-12 md:py-16">
        <div className="container-custom">
          <div className="mb-8 max-w-3xl">
            <p className="mb-3 text-sm font-semibold uppercase text-orange-700">
              {eyebrow}
            </p>
            <h1 className="mb-4 text-3xl font-bold tracking-tight text-slate-950 md:text-5xl">{title}</h1>
            <p className="text-lg text-slate-600">{description}</p>
          </div>

          <Card className="border-slate-200 shadow-sm">
            <CardBody>{children}</CardBody>
          </Card>
        </div>
      </section>
    </div>
  );
}
