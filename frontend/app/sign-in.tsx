import ButtonUser from '@/components/ButtonUser';
import Page from '@/components/Page';
import { SignInForm } from '@/components/SignInForm';
import { cssVar } from '@/constants/css';
import { Stack } from 'expo-router';
import { useMemo } from 'react';

export default function SignIn() {
  const screenOptions = useMemo(
    () => ({
      title: 'Login',
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
      headerRight: () => <ButtonUser />,
    }),
    []
  );
  return (
    <Page>
      <Stack.Screen options={screenOptions} />
      <SignInForm />
    </Page>
  );
}
