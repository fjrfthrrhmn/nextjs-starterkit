import {
  Copy,
  Trash2,
  Edit,
  Share2,
  Download,
  Upload,
  ExternalLink,
  Link,
  Globe,
  Moon,
  Sun,
  Languages,
  Contrast,
  type LucideIcon,
} from 'lucide-react';

export type Action2IconKey = 'copy' | 'trash' | 'edit' | 'share' | 'download' | 'upload' | 'external-link' | 'link' | 'select' | 'navigate' | 'globe' | 'moon' | 'sun' | 'languages' | 'contrast';

export const ACTION_2_ICONS: Record<Action2IconKey, LucideIcon> = {
  copy: Copy,
  trash: Trash2,
  edit: Edit,
  share: Share2,
  download: Download,
  upload: Upload,
  'external-link': ExternalLink,
  link: Link,
  select: Copy,
  navigate: Copy,
  globe: Globe,
  moon: Moon,
  sun: Sun,
  languages: Languages,
  contrast: Contrast,
} as const;

export const ACTION_2_ICON_KEYS = Object.keys(ACTION_2_ICONS) as Action2IconKey[];