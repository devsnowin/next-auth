'use client';

import { useState } from 'react';

export default function ForgotPassword() {
    const [sent, setSent] = useState(false);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const data = Object.fromEntries(formData.entries());

        try {
            const res = await fetch('/api/users/forgotpassword', {
                method: 'POST',
                body: JSON.stringify(data),
            });
            if (res.ok) setSent(true);
        } catch (error) {
            const err = error as Error;
            console.error(err.message);
        }
    }

    return (
        <section className="my-8">
            <form
                className="flex flex-col items-start gap-4"
                onSubmit={handleSubmit}
            >
                <h1 className="text-2xl font-bold">Forgot Password</h1>
                <div className="flex w-full flex-col items-start gap-2">
                    <label htmlFor="email">Email</label>
                    <input
                        required
                        type="email"
                        name="email"
                        id="email"
                        className="block w-full rounded-lg border-2 border-gray-300 bg-gray-50 p-2.5 text-sm outline-none transition-colors duration-100 ease-linear focus:border-slate-500 focus:ring-slate-500"
                        autoComplete="off"
                    />
                </div>
                <button
                    type="submit"
                    className="rounded-md bg-slate-800 px-4 py-2 text-white disabled:cursor-not-allowed"
                >
                    Send Mail
                </button>
                {sent && (
                    <p className="">
                        An email has been send please check you mail!
                    </p>
                )}
            </form>
        </section>
    );
}
