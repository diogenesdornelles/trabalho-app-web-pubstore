import Page from '@/components/Page';
import { SignInForm } from '@/components/SignInForm';
import { useDefaultScreenOptions } from '@/hooks/useDefaultScreenOptions';
import { Stack } from 'expo-router';

export default function SignIn() {
  const screenOptions = useDefaultScreenOptions({
    title: 'Login',
  });
  return (
    <Page>
      <Stack.Screen options={screenOptions} />
      <SignInForm />
    </Page>
  );
}
