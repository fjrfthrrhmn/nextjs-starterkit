'use client';

import React from 'react';
import Link from 'next/link';

import { paths } from '@/config/paths';
import { ACTION_2_ICONS, ICON_SIZES, ICON_STROKE, type Action2IconKey } from '@/constants/icons';

import { useHeader } from '@/hooks/use-header';
import { cn } from '@/utils/cn';

import {
	Button,
	buttonVariants,
	MenuToggleIcon,
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
	Typography
} from '@/components/ui';

export function Header() {
	const {
		open,
		setOpen,
		scrolled,
		locale,
		navLinks,
		toggleLanguage,
		getNavLabel,
		isActive,
		closeMobileMenu
	} = useHeader();

	const createIconElement = (key: Action2IconKey, className: string) => {
		const IconComponent = ACTION_2_ICONS[key];
		return React.createElement(IconComponent, {
			className,
			strokeWidth: ICON_STROKE.default
		});
	};

	const handleLocaleChange = (value: string) => {
		toggleLanguage(value);
	};

	return (
		<header
			className={cn(
				'sticky top-0 z-50 mx-auto w-full max-w-5xl border-b border-transparent md:rounded-3xl md:border md:transition-all md:ease-out',
				{
					'bg-background/95 supports-[backdrop-filter]:bg-background/50 border-border backdrop-blur md:top-4 md:max-w-4xl':
						scrolled && !open,
					'bg-background/90': open
				}
			)}
		>
			<nav
				className={cn(
					'flex h-14 w-full items-center justify-between px-4 md:h-12 md:transition-all md:ease-out',
					{
						'md:px-2': scrolled
					}
				)}
			>
				<Link href={paths.home.getHref()} className="text-lg font-semibold tracking-tight md:ms-2">
					FilmGueh
				</Link>

				<div className="hidden items-center gap-1 md:flex">
					<div className="hidden items-center gap-10 md:flex">
						{navLinks.map(link => (
							<Link
								key={link.key}
								href={link.getHref()}
								className={cn(
									'flex items-center gap-2 border-b-2 pb-1 transition-colors',
									isActive(link.href)
										? 'border-primary text-foreground'
										: 'border-transparent text-muted-foreground hover:border-muted-foreground/50 hover:text-foreground'
								)}
							>
								<Typography.Text size="xs">{getNavLabel(link.label)}</Typography.Text>
							</Link>
						))}
					</div>

					<div className="mx-2 h-4 w-px bg-border" />

					{/* <Select value={locale} onValueChange={handleLocaleChange}>
            <SelectTrigger className="h-8 w-[70px] text-xs">
              <SelectValue placeholder="Lang" />
            </SelectTrigger>
            <SelectContent align="end">
              <SelectItem value="en">EN</SelectItem>
              <SelectItem value="id">ID</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="ghost" size="icon" className="size-8 rounded-full">
            {createIconElement('moon', ICON_SIZES.sm)}
            <span className="sr-only">Toggle Theme</span>
          </Button> */}

					<div className="mx-2 h-4 w-px bg-border" />

					<Button variant="default" size="sm" className="rounded-full" asChild>
						<Link href={paths.movies.getHref()}>Get Started</Link>
					</Button>
				</div>

				<Button
					size="icon"
					variant="outline"
					onClick={() => setOpen(!open)}
					className="md:hidden size-8 rounded-full"
				>
					<MenuToggleIcon open={open} className="size-4" duration={300} />
				</Button>
			</nav>

			<div
				className={cn(
					'bg-background/90 fixed top-14 right-0 bottom-0 left-0 z-50 flex flex-col overflow-hidden border-y md:hidden',
					open ? 'block' : 'hidden'
				)}
			>
				<div
					data-slot={open ? 'open' : 'closed'}
					className={cn(
						'data-[slot=open]:animate-in data-[slot=open]:zoom-in-95 data-[slot=closed]:animate-out data-[slot=closed]:zoom-out-95 ease-out',
						'flex h-full w-full flex-col justify-between gap-y-2 p-4'
					)}
				>
					<div className="grid gap-y-1">
						{navLinks.map(link => (
							<Link
								key={link.key}
								href={link.getHref()}
								onClick={closeMobileMenu}
								className={buttonVariants({
									variant: isActive(link.href) ? 'secondary' : 'ghost',
									className: 'justify-start'
								})}
							>
								<Typography.Text size="xs">{getNavLabel(link.label)}</Typography.Text>
							</Link>
						))}
					</div>

					<div className="flex flex-col gap-3">
						<div className="flex items-center gap-2">
							<Select value={locale} onValueChange={handleLocaleChange}>
								<SelectTrigger className="flex-1 h-9 text-sm">
									<SelectValue placeholder="Language" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="en">English</SelectItem>
									<SelectItem value="id">Bahasa Indonesia</SelectItem>
								</SelectContent>
							</Select>

							<Button variant="outline" size="sm" className="size-9 rounded-full">
								{createIconElement('moon', ICON_SIZES.sm)}
							</Button>
						</div>

						<Button className="w-full rounded-full" asChild onClick={closeMobileMenu}>
							<Link href={paths.movies.getHref()}>Get Started</Link>
						</Button>
					</div>
				</div>
			</div>
		</header>
	);
}
