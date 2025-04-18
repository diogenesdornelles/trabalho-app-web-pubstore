import { SignInForm } from '@/components/sign-in-form';
import Page from '@/components/page';


export default function SignIn() {

    return (
        <Page title='Sign-in' customStyle={{ opacity: .8, filter: 'grayscale(80%)' }} blurSettings={{ intensity: 10, tint: 'systemUltraThinMaterialDark', radius: 4 }} >
            <SignInForm />
        </Page>
    );
}
