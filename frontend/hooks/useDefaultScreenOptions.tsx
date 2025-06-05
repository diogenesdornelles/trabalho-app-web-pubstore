import { useMemo } from 'react';
import { cssVar } from '@/constants/css';
import ButtonUser from '@/components/ButtonUser';

interface UseDefaultScreenOptionsProps {
  title: string;
  headerRight?: () => React.ReactNode;
  customOptions?: any;
}

export function useDefaultScreenOptions({
  title,
  headerRight = () => <ButtonUser />,
  customOptions = {},
}: UseDefaultScreenOptionsProps) {
  return useMemo(
    () => ({
      title,
      headerStyle: { backgroundColor: cssVar.color.black },
      headerTitleStyle: { color: cssVar.color.highlight },
      animation: 'fade' as const,
      headerTintColor: cssVar.color.white,
      headerShown: true,
      headerBackVisible: false,
      headerLeft: () => null,
      contentStyle: {
        flexDirection: 'row' as const,
        justifyContent: 'center' as const,
        alignItems: 'baseline' as const,
        alignContent: 'center' as const,
      },
      headerRight,
      ...customOptions,
    }),
    [title, headerRight, customOptions]
  );
}
