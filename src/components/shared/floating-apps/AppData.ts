import type { LucideIcon } from 'lucide-react';
import { Apple, Bus, Droplets, MapPinned, Smartphone } from 'lucide-react';

export type ExternalAppLink = {
  id: string;
  label: string;
  url: string;
  icon: LucideIcon;
};

export const APP_LINKS: ExternalAppLink[] = [
  {
    id: 'smart-nagrik-play',
    label: 'Smart Nagrik (Google Play)',
    url: 'https://play.google.com/store/apps/details?id=vmax.com.smartnagrik',
    icon: Smartphone,
  },
  {
    id: 'jalbell',
    label: 'JalBell',
    url: 'https://play.google.com/store/apps/details?id=in.xpica.jalbellv2',
    icon: Droplets,
  },
  {
    id: 'chalo',
    label: 'Chalo',
    url: 'https://apps.apple.com/in/app/chalo-live-bus-tracking-app/id1607824800',
    icon: Bus,
  },
  {
    id: 'zophop',
    label: 'Zophop',
    url: 'https://play.google.com/store/apps/details?id=app.zophop',
    icon: MapPinned,
  },
  {
    id: 'smart-nagrik-apple',
    label: 'Smart Nagrik (Apple App Store)',
    url: 'https://apps.apple.com/in/app/smart-nagrik-aurangabad-amc/id1633410274',
    icon: Apple,
  },
];
