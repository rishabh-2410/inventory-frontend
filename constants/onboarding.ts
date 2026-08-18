import { ImageSourcePropType } from 'react-native';
import type { ComponentProps } from 'react';
import MaterialIcons from '@react-native-vector-icons/material-icons';
import { icons } from './Icons';

type MaterialIconName = ComponentProps<typeof MaterialIcons>['name'];

export type OnboardingFeature = {
  icon: MaterialIconName;
  label: string;
  subtitle?: string;
  iconColor: string;
};

export type OnboardingSlideData = {
  key: string;
  image: ImageSourcePropType;
  title: string;
  highlight?: string;
  description: string;
  features: OnboardingFeature[];
  buttonLabel: string;
  showTerms?: boolean;
};

export const onboardingSlides: OnboardingSlideData[] = [
  {
    key: 'welcome',
    image: icons.welcomeIcon,
    title: 'Track with',
    highlight: 'Precision',
    description:
      'Real-time inventory monitoring across all your storage locations.',
    features: [
      { icon: 'location-on', label: 'Multi-Site', iconColor: '#0b7a4d' },
      { icon: 'bar-chart', label: 'Real-Time', iconColor: '#457ae5' },
    ],
    buttonLabel: 'Next',
    showTerms: true,
  },
  {
    key: 'ready',
    image: icons.readyIcon,
    title: 'Pure Inventory Focus',
    description:
      'Focused entirely on your catalog, movements, and team.',
    features: [
      {
        icon: 'inventory-2',
        label: 'Catalog First',
        subtitle: 'Total visibility across all locations.',
        iconColor: '#0b7a4d',
      },
      {
        icon: 'history',
        label: 'Movements',
        subtitle: "Trace every item's journey instantly.",
        iconColor: '#457ae5',
      },
    ],
    buttonLabel: 'Next',
  },
  {
    key: 'warehouses',
    image: icons.warehousesIcon,
    title: 'Manage Your Warehouses',
    description:
      'Define storage nodes and handle stock movements between facilities with ease.',
    features: [],
    buttonLabel: 'Get started',
  },
];
