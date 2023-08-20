'use client';

import { useEffect, useState } from 'react';

export default function VerifyEmailPage() {
    const [token, setToken] = useState('');
    const [verified, setVerified] = useState(false);
    const [error, setError] = useState(false);

    async function verifyEmail() {
        try {
            const res = await fetch('/api/users/verifyemail', {
                method: 'POST',
                body: JSON.stringify({ token }),
            });
            if (res.ok) setVerified(true);
        } catch (error) {
            const err = error as Error;
            setError(true);
            console.error(err.message);
        }
    }

    useEffect(() => {
        const urlToken = window.location.search.split('=')[1];
        setToken(urlToken);
    }, []);

    useEffect(() => {
        if (token?.length > 0) verifyEmail();
    }, [token]);

    return (
        <section>
            <h1>Verify your email</h1>
            <p>{token ? token : 'no token'}</p>
            {verified && (
                <div>
                    <h2>Email verified</h2>
                </div>
            )}
            {error && (
                <div>
                    <h2 className="text-red-400">Error</h2>
                </div>
            )}
        </section>
    );
}
