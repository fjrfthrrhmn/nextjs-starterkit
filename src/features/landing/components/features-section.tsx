'use client';

import { useTranslations } from 'next-intl';

import { Title, Typography } from '@/components/ui';

import { FeatureCards } from './feature-cards';

type FeaturesSectionProps = {
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
};

function FeaturesSection({
  title,
  subtitle,
}: FeaturesSectionProps) {
  const t = useTranslations('features');

  return (
    <section className="px-4 py-20 sm:py-28">
      <div className="mx-auto w-full max-w-5xl">
        <Title level="2" className="mb-12">
          {title ?? t('title')}
          {subtitle ?? (
            <Typography.Text
              as="span"
              variant="sm/normal"
              className="mt-2 block text-muted-foreground"
            >
              {t('subtitle')}
            </Typography.Text>
          )}
        </Title>
        <FeatureCards />
      </div>
    </section>
  );
}

export { FeaturesSection, type FeaturesSectionProps };
