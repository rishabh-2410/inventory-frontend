import { ImageSourcePropType } from 'react-native';
import type { ComponentProps } from 'react';
import MaterialIcons from '@react-native-vector-icons/material-icons';

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
    image: require('../assets/onboarding/welcome.png'),
    title: 'Track with',
    highlight: 'Precision',
    description:
      'Real-time inventory monitoring across all your storage locations without the complexity of sales or dispatching.',
    features: [
      { icon: 'location-on', label: 'Multi-Site', iconColor: '#0b7a4d' },
      { icon: 'bar-chart', label: 'Real-Time', iconColor: '#457ae5' },
    ],
    buttonLabel: 'Next',
    showTerms: true,
  },
  {
    key: 'ready',
    image: require('../assets/onboarding/ready.png'),
    title: 'Pure Inventory Focus',
    description:
      'Focused entirely on your catalog, movements, and team. No pricing, no orders, just your stock.',
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
    image: require('../assets/onboarding/warehouses.png'),
    title: 'Manage Your Warehouses',
    description:
      'Define storage nodes, monitor capacity, and handle stock movements between facilities with ease.',
    features: [],
    buttonLabel: 'Get started',
  },
];
