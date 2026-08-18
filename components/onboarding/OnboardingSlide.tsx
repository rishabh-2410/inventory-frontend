import { Image, Text, View } from 'react-native';
import MaterialIcons from '@react-native-vector-icons/material-icons';

import { OnboardingSlideData } from '@/constants/onboarding';

type OnboardingSlideProps = {
  slide: OnboardingSlideData;
  width: number;
};

export default function OnboardingSlide({ slide, width }: OnboardingSlideProps) {
  const hasCardFeatures = slide.features.some((feature) => feature.subtitle);

  return (
    <View style={{ width }} className="flex-1 px-6 pt-2">
      <Image
        source={slide.image}
        resizeMode="contain"
        style={{ width: '100%', height: 350 }}
      />

      <Text className="mt-5 text-center text-[32px] font-inter-bold leading-[38px] tracking-[-0.5px] text-[#171a21]">
        {slide.title}
        {slide.highlight ? (
          <>
            {' '}
            <Text className="font-inter-bold text-[#0b7a4d]">{slide.highlight}</Text>
          </>
        ) : null}
      </Text>

      <Text className="mt-3 text-center text-[16px] font-inter-regular leading-[24px] text-[#7a8596]">
        {slide.description}
      </Text>

      {slide.features.length > 0 ? (
        hasCardFeatures ? (
          <View className="mt-6 flex-row gap-3">
            {slide.features.map((feature) => (
              <View
                key={feature.label}
                className="flex-1 rounded-2xl border border-[#e6ebf1] bg-white px-3 py-4 shadow-sm">
                <View className="mb-3 h-10 w-10 items-center justify-center rounded-xl bg-[#dff1ea]">
                  <MaterialIcons name={feature.icon} size={22} color={feature.iconColor} />
                </View>
                <Text className="text-[15px] font-inter-bold text-[#171a21]">{feature.label}</Text>
                {feature.subtitle ? (
                  <Text className="mt-1 text-[12px] font-inter-regular leading-[16px] text-[#7a8596]">
                    {feature.subtitle}
                  </Text>
                ) : null}
              </View>
            ))}
          </View>
        ) : (
          <View className="mt-6 flex-row gap-3">
            {slide.features.map((feature) => (
              <View
                key={feature.label}
                className="flex-1 items-center rounded-2xl bg-[#e8f5ef] py-4">
                <MaterialIcons name={feature.icon} size={22} color={feature.iconColor} />
                <Text className="mt-2 text-[14px] font-inter-bold text-[#171a21]">{feature.label}</Text>
              </View>
            ))}
          </View>
        )
      ) : null}
    </View>
  );
}
