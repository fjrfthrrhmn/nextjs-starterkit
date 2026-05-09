import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/utils/cn';

const titleVariants = cva('text-pretty leading-relaxed', {
  variants: {
    level: {
      1: 'text-4xl sm:text-5xl',
      2: 'text-3xl sm:text-4xl',
      3: 'text-2xl sm:text-3xl',
      4: 'text-xl sm:text-2xl',
      5: 'text-lg sm:text-xl',
      6: 'text-base sm:text-lg',
    },
    weight: {
      normal: 'font-normal',
      medium: 'font-medium',
      semibold: 'font-semibold',
      bold: 'font-bold',
      extrabold: 'font-extrabold',
      black: 'font-black',
    },
  },
});

const textVariants = cva('text-pretty leading-tight', {
  variants: {
    size: {
      xl: 'text-2xl',
      lg: 'text-xl',
      md: 'text-lg',
      sm: 'text-base',
      xs: 'text-sm',
    },
    weight: {
      light: 'font-light',
      normal: 'font-normal',
      medium: 'font-medium',
      semibold: 'font-semibold',
      bold: 'font-bold',
      black: 'font-black',
    },
  },
});

type TitleLevel = 1 | 2 | 3 | 4 | 5 | 6;
type TitleWeight =
  | 'normal'
  | 'medium'
  | 'semibold'
  | 'bold'
  | 'extrabold'
  | 'black';
type TextSize = 'xl' | 'lg' | 'md' | 'sm' | 'xs';
type TextWeight = 'light' | 'normal' | 'medium' | 'semibold' | 'bold' | 'black';

type TitleProps = React.HTMLAttributes<HTMLHeadingElement> &
  VariantProps<typeof titleVariants> & {
    variant: `${TitleLevel}/${TitleWeight}`;
  };

type TextElement = 'p' | 'code' | 'strong' | 'span' | 'small' | 'mark' | 'kbd';

type TextProps = React.HTMLAttributes<HTMLParagraphElement> &
  VariantProps<typeof textVariants> & {
    variant?: `${TextSize}/${TextWeight}`;
    as?: TextElement;
    colorParagraph?: boolean;
  };

const Title = React.forwardRef<HTMLHeadingElement, TitleProps>(
  ({ className, variant, ...props }, ref) => {
    const [level, weight] = (variant ?? '1/normal').split('/') as [
      TitleLevel,
      TitleWeight,
    ];
    const Tag = `h${level}` as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

    return (
      <Tag
        ref={ref}
        className={cn(titleVariants({ level, weight, className }))}
        {...props}
      />
    );
  },
);
Title.displayName = 'Typography.Title';

const Text = React.forwardRef<HTMLParagraphElement, TextProps>(
  (
    {
      className,
      variant = 'xs/normal',
      as: Tag = 'p',
      colorParagraph = false,
      ...props
    },
    ref,
  ) => {
    const [size, weight] = variant.split('/') as [TextSize, TextWeight];

    return (
      <Tag
        ref={ref as never}
        className={cn(
          textVariants({ size, weight }),
          colorParagraph && 'text-paragraph',
          className,
          'font-serif',
        )}
        {...props}
      />
    );
  },
);
Text.displayName = 'Typography.Text';

export const Typography = { Title, Text };
