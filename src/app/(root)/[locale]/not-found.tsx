'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';

import { Button, Typography } from '@/components/ui';
import { paths } from '@/config/paths';

const NotFoundPage = () => {
  const t = useTranslations('notFound');

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      <Typography.Title variant="1/extrabold" className="text-primary">
        {t('title')}
      </Typography.Title>
      <Typography.Text variant="lg/normal" className="mt-4 text-muted-foreground">
        {t('message')}
      </Typography.Text>
      <Button variant="default" size="lg" className="mt-8 rounded-full" asChild>
        <Link href={paths.home.getHref()}>
          {t('backHome')}
        </Link>
      </Button>
    </div>
  );
};

export default NotFoundPage;
