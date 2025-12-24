import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import AIInput from "@/components/AIInput";

export default async function DashboardPage() {
    const supabase = await createClient();

    const { data: { user }, error } = await supabase.auth.getUser();

    if (error || !user) {
        redirect("/login");
    }

    return (
        <div className="max-w-5xl mx-auto space-y-16">
            <div className="text-center space-y-6 pt-12">
                <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-b from-white via-zinc-200 to-zinc-500 text-transparent bg-clip-text tracking-tight animate-in fade-in slide-in-from-bottom-4 duration-700">
                    What's the plan?
                </h1>
                <p className="text-zinc-400 text-lg font-light tracking-wide animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
                    Manage your tasks, schedule, and goals with <span className="text-white font-medium">AI Intelligence</span>.
                </p>
            </div>

            <div className="w-full animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
                <AIInput />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
                {/* Placeholder Widgets */}
                <div className="group bg-zinc-900/50 backdrop-blur-sm p-6 rounded-2xl border border-white/5 hover:border-blue-500/30 hover:bg-zinc-900/80 transition-all duration-500 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <h3 className="text-sm font-medium text-zinc-400 mb-4 uppercase tracking-wider">Pending</h3>
                    <p className="text-4xl font-bold text-white mb-2">12</p>
                    <p className="text-xs text-zinc-500">3 tasks due today</p>
                </div>

                <div className="group bg-zinc-900/50 backdrop-blur-sm p-6 rounded-2xl border border-white/5 hover:border-purple-500/30 hover:bg-zinc-900/80 transition-all duration-500 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <h3 className="text-sm font-medium text-zinc-400 mb-4 uppercase tracking-wider">Completed</h3>
                    <p className="text-4xl font-bold text-white mb-2">85</p>
                    <p className="text-xs text-zinc-500">Archive matches last 7 days</p>
                </div>

                <div className="group bg-zinc-900/50 backdrop-blur-sm p-6 rounded-2xl border border-white/5 hover:border-emerald-500/30 hover:bg-zinc-900/80 transition-all duration-500 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <h3 className="text-sm font-medium text-zinc-400 mb-4 uppercase tracking-wider">Productivity</h3>
                    <p className="text-4xl font-bold text-emerald-400 mb-2">98%</p>
                    <p className="text-xs text-zinc-500">Based on completion rate</p>
                </div>
            </div>

            <div className="bg-zinc-900/30 backdrop-blur-sm rounded-2xl border border-white/5 p-8 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-500">
                <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-zinc-500"></span>
                    Recent Activity
                </h3>
                <div className="space-y-1">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="group flex items-center justify-between py-4 px-4 rounded-xl hover:bg-white/5 transition-colors cursor-default">
                            <div className="flex items-center gap-4">
                                <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center border border-white/5 group-hover:border-white/20 transition-colors text-xs text-zinc-400">AI</div>
                                <p className="text-zinc-300 text-sm group-hover:text-white transition-colors">Updated project timeline based on new requirements</p>
                            </div>
                            <span className="text-xs text-zinc-600 font-mono group-hover:text-zinc-500">10:4{i} AM</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}