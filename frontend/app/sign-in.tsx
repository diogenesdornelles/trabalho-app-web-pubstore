import ButtonUser from '@/components/ButtonUser';
import Page from '@/components/Page';
import { SignInForm } from '@/components/SignInForm';
import { cssVar } from '@/constants/css';
import { Stack } from 'expo-router';

export default function SignIn() {
  return (
    <Page
      customStyle={{ opacity: 0.8, filter: 'grayscale(80%)' }}
      blurSettings={{ intensity: 10, tint: 'systemUltraThinMaterialDark', radius: 4 }}
    >
      <Stack.Screen
        options={{
          title: 'Sign-in',
          headerStyle: { backgroundColor: cssVar.color.black },
          headerTitleStyle: { color: cssVar.color.highlight },
          animation: 'fade',
          headerTintColor: cssVar.color.white,
          headerShown: true,
          contentStyle: {
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'baseline',
            alignContent: 'center',
          },
          headerRight: () => <ButtonUser />,
        }}
      />
      <SignInForm />
    </Page>
  );
}
