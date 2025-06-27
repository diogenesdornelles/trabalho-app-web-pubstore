import CustomHeader from '@/components/CustomHeader';
import Page from '@/components/Page';
import { SignInForm } from '@/components/SignInForm';

export default function SignIn() {
  return (
    <Page header={<CustomHeader title="Sigin" />} type="view">
      <SignInForm />
    </Page>
  );
}
