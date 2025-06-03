import ButtonUser from '@/components/ButtonUser';
import Page from '@/components/Page';
import { SignInForm } from '@/components/SignInForm';
import { cssVar } from '@/constants/css';
import { Stack } from 'expo-router';

export default function SignIn() {
  return (
    <Page>
      <Stack.Screen
        options={{
          title: 'Logar',
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
