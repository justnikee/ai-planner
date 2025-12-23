"use client";

import { useState } from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

type Task = {
    id: string
    title: string
}

export default function CreateTaskPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);


    const [tasks, setTasks] = useState<Task[]>([])
    const [taskLoading, setTasksLoading] = useState(true)
    async function fetchTasks() {
        setTasksLoading(true);
        try {
            const res = await fetch('/api/v1/tasks');
            const data = await res.json();
            setTasks(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error('Failed to fetch tasks');
        } finally {
            setTasksLoading(false);
        }
    }


    useEffect(() => {
        fetchTasks();
    }, []);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(false);

        const formData = new FormData(e.currentTarget);
        const data = {
            title: formData.get("title"),
            due_at: formData.get("due_at"),
            status: formData.get("status"),
        };

        try {
            const res = await fetch("/api/v1/tasks", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (!res.ok) {
                const json = await res.json();
                throw new Error(json.error || "Failed to create task");
            }

            setSuccess(true);
            (e.target as HTMLFormElement).reset();
            router.refresh();
            await fetchTasks();

        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-zinc-950 text-zinc-100 p-6 md:p-12 font-sans selection:bg-indigo-500/30">
            <div className="max-w-2xl mx-auto mb-20">

                {/* Header Section */}
                <div className="mb-10 text-center md:text-left">
                    <h1 className="text-4xl font-extrabold text-white tracking-tight sm:text-5xl mb-3">
                        Create New Task
                    </h1>
                    <p className="text-lg text-zinc-400 max-w-lg">
                        Add a new item to your planner. Stay organized and track your progress with ease.
                    </p>
                </div>

                {/* Form Card */}
                <div className="bg-zinc-900/50 backdrop-blur-xl rounded-2xl shadow-2xl shadow-black/50 border border-zinc-800/50 overflow-hidden">
                    <div className="p-8 sm:p-10">

                        {success && (
                            <div className="mb-6 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-4 py-3 rounded-xl flex items-center gap-3 animate-in fade-in slide-in-from-top-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
                                <span className="font-medium">Task created successfully!</span>
                            </div>
                        )}

                        {error && (
                            <div className="mb-6 bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-xl flex items-center gap-3 animate-in fade-in slide-in-from-top-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="12" x2="12" y1="8" y2="12" /><line x1="12" x2="12.01" y1="16" y2="16" /></svg>
                                <span className="font-medium">{error}</span>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">

                            {/* Title Input */}
                            <div className="space-y-2">
                                <label htmlFor="title" className="block text-sm font-semibold text-zinc-300">
                                    Task Title
                                </label>
                                <input
                                    type="text"
                                    id="title"
                                    name="title"
                                    required
                                    placeholder="e.g. Redesign homepage hero section"
                                    className="w-full px-4 py-3 rounded-xl bg-zinc-950/50 border border-zinc-800 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all duration-200 ease-in-out outline-none placeholder:text-zinc-600 text-zinc-100 font-medium"
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Due Date Input */}
                                <div className="space-y-2">
                                    <label htmlFor="due_at" className="block text-sm font-semibold text-zinc-300">
                                        Due Date
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="datetime-local"
                                            id="due_at"
                                            name="due_at"
                                            className="w-full px-4 py-3 rounded-xl bg-zinc-950/50 border border-zinc-800 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all duration-200 ease-in-out outline-none text-zinc-400 font-medium [&::-webkit-calendar-picker-indicator]:invert"
                                        />
                                    </div>
                                </div>

                                {/* Status Select */}
                                <div className="space-y-2">
                                    <label htmlFor="status" className="block text-sm font-semibold text-zinc-300">
                                        Status
                                    </label>
                                    <div className="relative">
                                        <select
                                            id="status"
                                            name="status"
                                            className="w-full px-4 py-3 rounded-xl bg-zinc-950/50 border border-zinc-800 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all duration-200 ease-in-out outline-none text-zinc-300 font-medium appearance-none"
                                            defaultValue="pending"
                                        >
                                            <option value="pending">Pending</option>
                                            <option value="done">Done</option>
                                        </select>
                                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-500">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <div className="pt-4">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-[1.01] active:scale-[0.99] disabled:opacity-70 disabled:cursor-not-allowed shadow-lg shadow-indigo-500/20 flex justify-center items-center gap-2"
                                >
                                    {loading ? (
                                        <>
                                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Creating...
                                        </>
                                    ) : (
                                        <>
                                            Create Task
                                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" x2="12" y1="5" y2="19" /><line x1="5" x2="19" y1="12" y2="12" /></svg>
                                        </>
                                    )}
                                </button>
                            </div>

                        </form>
                    </div>
                </div>

                {/* Footer / Back link */}
                <div className="mt-8 text-center">
                    <button
                        onClick={() => router.back()}
                        className="text-zinc-500 hover:text-zinc-300 font-medium transition-colors duration-200 flex items-center justify-center gap-2 mx-auto"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
                        Back to Dashboard
                    </button>
                </div>

            </div>

            <div className="max-w-4xl mx-auto">
                <GetTasks tasks={tasks} loading={taskLoading} />
            </div>
        </div>
    );
}

type GetTasksProps = {
    tasks: Task[];
    loading: boolean;
}

export function GetTasks({ tasks, loading }: GetTasksProps) {


    if (loading) return (
        <div className="flex justify-center p-8 text-zinc-500 animate-pulse">
            Loading tasks...
        </div>
    )

    return (
        <div className="border-t border-zinc-800 pt-10">
            <h2 className="text-2xl font-bold text-white mb-6">Recent Tasks</h2>

            {tasks.length === 0 ? (
                <p className="text-zinc-500 italic">No tasks found yet.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {tasks.map((task, index) => (
                        <Link key={index} href={`/dashboard/tasks/${task.id}`} className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition-colors">
                            <h3 className="text-zinc-200 font-medium">{task.title}</h3>
                        </Link>

                    ))}
                </div>
            )}
        </div>
    )
}