'use client';

import Link from 'next/link';
import React from 'react';

type AuthFormProps = {
    mode: 'Sign in' | 'Sign up';
};

export default function AuthForm({ mode }: AuthFormProps) {
    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const data = Object.fromEntries(formData.entries());

        console.log('data: ', data);
    }

    return (
        <form
            className="flex w-full flex-col items-start gap-4 rounded-md bg-slate-200 p-8"
            onSubmit={handleSubmit}
        >
            <h1 className="text-2xl font-bold capitalize">{mode}</h1>
            {mode === 'Sign up' && (
                <div className="flex w-full flex-col items-start gap-2">
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        className="block w-full rounded-lg border-2 border-gray-300 bg-gray-50 p-2.5 text-sm outline-none transition-colors duration-100 ease-linear focus:border-slate-500 focus:ring-slate-500"
                        autoComplete="off"
                    />
                </div>
            )}
            <div className="flex w-full flex-col items-start gap-2">
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    name="email"
                    id="email"
                    className="block w-full rounded-lg border-2 border-gray-300 bg-gray-50 p-2.5 text-sm outline-none transition-colors duration-100 ease-linear focus:border-slate-500 focus:ring-slate-500"
                    autoComplete="off"
                />
            </div>
            <div className="flex w-full flex-col items-start gap-2">
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    name="password"
                    id="password"
                    className="block w-full rounded-lg border-2 border-gray-300 bg-gray-50 p-2.5 text-sm outline-none transition-colors duration-100 ease-linear focus:border-slate-500 focus:ring-slate-500"
                />
            </div>
            <button
                type="submit"
                className="rounded-md bg-slate-800 px-4 py-2 text-white"
            >
                {mode}
            </button>
            {mode === 'Sign in' ? (
                <p>
                    Don't have an account?{' '}
                    <Link href="/signup" className="font-bold underline">
                        create one
                    </Link>
                </p>
            ) : (
                <p>
                    Already have an account?{' '}
                    <Link href="/signin" className="font-bold underline">
                        sign in
                    </Link>
                </p>
            )}
        </form>
    );
}
