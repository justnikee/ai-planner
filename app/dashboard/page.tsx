import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { signOut } from "@/app/auth/actions"; // We'll double-check this action exists below

export default async function DashboardPage() {
    const supabase = await createClient();

    const { data: { user }, error } = await supabase.auth.getUser();

    if (error || !user) {
        redirect("/login");
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen gap-6 p-8">
            <h1 className="text-3xl font-bold">Success! 🎉</h1>

            <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg text-center">
                <p className="text-gray-400 mb-2">You are logged in as:</p>
                <p className="text-xl font-mono text-blue-400">{user.email}</p>
                <p className="text-xs text-gray-500 mt-4">User ID: {user.id}</p>
            </div>

            <form action={signOut}>
                <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded transition">
                    Sign Out
                </button>
            </form>
        </div>
    );
}