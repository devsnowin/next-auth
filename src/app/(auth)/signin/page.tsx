import AuthForm from '@/components/Authform';

export default function SignInPage() {
    return (
        <section className="grid h-full place-items-center px-4">
            <AuthForm mode="Sign in" />
        </section>
    );
}
