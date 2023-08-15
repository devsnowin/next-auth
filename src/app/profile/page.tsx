'use client';

export default function ProfilePage() {
    async function handleLogout() {
        try {
            await fetch('/api/users/signout', { method: 'POST' });
        } catch (error) {
            const err = error as Error;
            console.error('Error in logging out user: ', err.message);
        }
    }

    return (
        <section>
            <h1>Profile page</h1>
            <button onClick={handleLogout}>Sign out</button>
        </section>
    );
}
