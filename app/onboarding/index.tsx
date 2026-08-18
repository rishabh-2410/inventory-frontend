import { useCallback, useRef, useState } from 'react';
import {
  FlatList,
  ListRenderItemInfo,
  Pressable,
  Text,
  useWindowDimensions,
  View,
  ViewToken,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link, router } from 'expo-router';
import MaterialIcons from '@react-native-vector-icons/material-icons';

import OnboardingSlide from '@/components/onboarding/OnboardingSlide';
import { onboardingSlides, OnboardingSlideData } from '@/constants/onboarding';
import { useOnboardingStore } from '@/hooks/useOnboardingStatus';

const viewabilityConfig = {
  viewAreaCoveragePercentThreshold: 50,
};

export default function OnboardingScreen() {
  const { width } = useWindowDimensions();
  const listRef = useRef<FlatList<OnboardingSlideData>>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const completeOnboarding = useOnboardingStore((state) => state.completeOnboarding);

  const slide = onboardingSlides[activeIndex];
  const isLastSlide = activeIndex === onboardingSlides.length - 1;

  const onViewableItemsChanged = useCallback(({ viewableItems }: { viewableItems: ViewToken[] }) => {
    const nextIndex = viewableItems[0]?.index;
    if (nextIndex != null) setActiveIndex(nextIndex);
  }, []);

  const renderItem = useCallback(
    ({ item }: ListRenderItemInfo<OnboardingSlideData>) => (
      <OnboardingSlide slide={item} width={width} />
    ),
    [width]
  );

  async function handleCtaPress() {
    if (isLastSlide) {
      await completeOnboarding();
      router.replace('/(auth)/register');
      return;
    }

    listRef.current?.scrollToIndex({ index: activeIndex + 1, animated: true });
  }

  return (
    <SafeAreaView className="flex-1 bg-[#f6f8fb]">
      <FlatList
        ref={listRef}
        data={onboardingSlides}
        keyExtractor={(item) => item.key}
        renderItem={renderItem}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        snapToInterval={width}
        snapToAlignment="center"
        decelerationRate="fast"
        bounces={false}
        getItemLayout={(_, index) => ({
          length: width,
          offset: width * index,
          index,
        })}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        onScrollToIndexFailed={({ index }) => {
          requestAnimationFrame(() => {
            listRef.current?.scrollToIndex({ index, animated: true });
          });
        }}
      />

      <View className="px-6 pb-6">
        <View className="mb-6 flex-row items-center justify-center gap-2">
          {onboardingSlides.map((item, index) => (
            <View
              key={item.key}
              className={
                index === activeIndex
                  ? 'h-2 w-8 rounded-full bg-[#0b7a4d]'
                  : 'h-2 w-2 rounded-full bg-[#d0d5dd]'
              }
            />
          ))}
        </View>

        <Pressable
          onPress={handleCtaPress}
          className="flex-row items-center justify-center rounded-full bg-[#0b7a4d] px-5 py-4 shadow-sm">
          <Text className="mr-2 text-[18px] font-semibold text-white">{slide.buttonLabel}</Text>
          <MaterialIcons name="arrow-forward" size={18} color="white" />
        </Pressable>

        <View className="mt-4 h-5 items-center justify-center">
          {slide.showTerms ? (
            <Text className="text-center text-[13px] text-[#7a8596]">
              By continuing, you agree to our{' '}
              <Link href="/terms-of-service" className="underline">
                Terms of Service
              </Link>
            </Text>
          ) : null}
        </View>
      </View>
    </SafeAreaView>
  );
}
