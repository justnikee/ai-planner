import { signInWithMagicLink } from '@/app/auth/actions'

export default async function LoginPage(props: {
    searchParams: Promise<{ message: string }>
}) {
    const searchParams = await props.searchParams
    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <form action={signInWithMagicLink} className="flex flex-col gap-4 p-8 border rounded-lg shadow-md w-80">
                <h1 className="text-2xl font-bold text-center">Login</h1>

                <div className="flex flex-col gap-2">
                    <label htmlFor="email" className="text-sm font-medium">Email</label>
                    <input
                        name="email"
                        type="email"
                        placeholder="you@example.com"
                        required
                        className="border p-2 rounded text-black"
                    />
                </div>

                <button className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition">
                    Send Magic Link
                </button>

                {searchParams?.message && (
                    <p className="text-center text-sm text-yellow-500 mt-2 bg-yellow-100 p-2 rounded border border-yellow-200">
                        {searchParams.message}
                    </p>
                )}
            </form>
        </div>
    )
}