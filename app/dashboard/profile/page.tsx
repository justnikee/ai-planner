import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { signOut } from "@/app/auth/actions";

export default async function ProfilePage() {
    const supabase = await createClient();
    const { data: { user }, error } = await supabase.auth.getUser();

    if (error || !user) {
        redirect("/login");
    }

    return (
        <div className="max-w-2xl mx-auto space-y-8">
            <h1 className="text-3xl font-bold text-white">Profile</h1>

            <div className="bg-gray-800 rounded-xl p-8 border border-gray-700 shadow-xl">
                <div className="flex items-center gap-6 mb-8">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center text-3xl font-bold text-white">
                        {user.email?.[0].toUpperCase()}
                    </div>
                    <div>
                        <h2 className="text-xl font-semibold text-white">User Profile</h2>
                        <p className="text-gray-400">Manage your account settings</p>
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-gray-900/50 p-4 rounded-lg">
                            <label className="block text-xs text-gray-500 uppercase font-semibold mb-1">Email</label>
                            <p className="text-gray-200 font-mono">{user.email}</p>
                        </div>
                        <div className="bg-gray-900/50 p-4 rounded-lg">
                            <label className="block text-xs text-gray-500 uppercase font-semibold mb-1">User ID</label>
                            <p className="text-gray-200 font-mono text-xs truncate" title={user.id}>{user.id}</p>
                        </div>
                    </div>
                </div>

                <div className="mt-8 pt-8 border-t border-gray-700">
                    <form action={signOut}>
                        <button className="bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/20 px-6 py-2 rounded-lg transition-all duration-200 flex items-center gap-2">
                            <span>Sign Out</span>
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
