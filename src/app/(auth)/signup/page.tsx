import AuthForm from '@/components/Authform';

export default function SignupPage() {
    return (
        <section className="grid h-full place-items-center px-4">
            <AuthForm mode="Sign up" />
        </section>
    );
}
