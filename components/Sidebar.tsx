"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
    const pathname = usePathname();

    const navItems = [
        { name: "Dashboard", href: "/dashboard" },
        { name: "Tasks", href: "/dashboard/tasks" },
        { name: "Profile", href: "/dashboard/profile" },
    ];

    return (
        <aside className="w-64 bg-zinc-950/50 backdrop-blur-xl border-r border-white/5 text-white flex flex-col h-screen fixed left-0 top-0 z-20">
            <div className="p-6 border-b border-white/5">
                <h1 className="text-xl font-bold bg-gradient-to-br from-white to-zinc-500 text-transparent bg-clip-text flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]"></span>
                    AI Planner
                </h1>
            </div>
            <nav className="flex-1 p-4 space-y-1">
                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`group flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${isActive
                                    ? "bg-white/5 text-white shadow-inner"
                                    : "text-zinc-400 hover:text-white hover:bg-white/5"
                                }`}
                        >
                            <span className={`w-1 h-1 rounded-full transition-all duration-300 ${isActive ? 'bg-blue-400 scale-125' : 'bg-zinc-600 group-hover:bg-zinc-400'}`}></span>
                            <span className="font-medium text-sm">{item.name}</span>
                        </Link>
                    );
                })}
            </nav>
            <div className="p-4 border-t border-white/5">
                <div className="px-4 py-3 rounded-xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/10">
                    <p className="text-xs font-medium text-blue-200">Pro Plan</p>
                    <p className="text-[10px] text-zinc-400 mt-1">Upgrade for more AI tasks</p>
                </div>
            </div>
        </aside>
    );
}
