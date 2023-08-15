'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

type User = {
    name: string;
    email: string;
    isVerified: string;
};

export default function ProfilePage() {
    const router = useRouter();
    const [user, setUser] = useState<User | null>();

    useEffect(() => {
        (async () => {
            const res = await fetch('/api/users/me');
            const jsonRes = await res.json();
            if (res.ok) setUser(jsonRes.data);
        })();
    }, []);

    async function handleLogout() {
        try {
            await fetch('/api/users/signout', { method: 'POST' });
            void router.push('/signin');
        } catch (error) {
            const err = error as Error;
            console.error('Error in logging out user: ', err.message);
        }
    }

    return (
        <section className="my-8">
            <form className="flex flex-col items-start gap-4">
                <h1 className="text-2xl font-bold capitalize">Profile page</h1>
                <div className="flex w-full flex-col items-start gap-2">
                    <label htmlFor="name">Name</label>
                    <input
                        required
                        value={user?.name}
                        type="text"
                        name="name"
                        id="name"
                        disabled
                        className="block w-full rounded-lg border-2 border-gray-300 bg-gray-50 p-2.5 text-sm outline-none transition-colors duration-100 ease-linear focus:border-slate-500 focus:ring-slate-500"
                        autoComplete="off"
                    />
                </div>
                <div className="flex w-full flex-col items-start gap-2">
                    <label htmlFor="email">Email</label>
                    <input
                        required
                        value={user?.email}
                        type="email"
                        name="email"
                        id="email"
                        disabled
                        className="block w-full rounded-lg border-2 border-gray-300 bg-gray-50 p-2.5 text-sm outline-none transition-colors duration-100 ease-linear focus:border-slate-500 focus:ring-slate-500"
                        autoComplete="off"
                    />
                </div>
                <button
                    onClick={handleLogout}
                    className="rounded-md bg-slate-800 px-4 py-2 text-white disabled:cursor-not-allowed"
                >
                    Sign out
                </button>
            </form>
        </section>
    );
}
