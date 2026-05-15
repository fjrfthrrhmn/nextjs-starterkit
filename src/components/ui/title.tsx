import * as React from 'react';

import { cn } from '@/utils/cn';

import { Typography } from '@/components/ui';

type TitleProps = {
	children: React.ReactNode;
	subtitle?: React.ReactNode;
	className?: string;
	level?: '1' | '2' | '3' | '4' | '5' | '6';
};

function Title({ children, subtitle, className, level = '2', ...props }: TitleProps) {
	return (
		<div className={cn('space-y-2 py-10', className)} {...props}>
			<Typography.Title variant={`${level}/semibold`}>{children}</Typography.Title>
			{subtitle && (
				<Typography.Text variant="sm/normal" className="text-muted-foreground">
					{subtitle}
				</Typography.Text>
			)}
		</div>
	);
}

export { Title, type TitleProps };
