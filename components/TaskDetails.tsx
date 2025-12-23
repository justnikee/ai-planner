"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Task } from "@prisma/client";

interface TaskDetailsProps {
    task: Task;
}

export default function TaskDetails({ task }: TaskDetailsProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    // Form state
    const [title, setTitle] = useState(task.title);
    const [status, setStatus] = useState(task.status);
    const [dueAt, setDueAt] = useState(task.due_at ? new Date(task.due_at).toISOString().slice(0, 16) : "");

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            const res = await fetch(`/api/v1/tasks/${task.id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    title,
                    status,
                    due_at: dueAt || null,
                }),
            });

            if (!res.ok) {
                const json = await res.json();
                throw new Error(json.error || "Failed to update task");
            }

            setSuccess(true);
            router.refresh();
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        if (!confirm("Are you sure you want to delete this task? This action cannot be undone.")) return;

        setLoading(true);
        try {
            const res = await fetch(`/api/v1/tasks/${task.id}`, {
                method: "DELETE",
            });

            if (!res.ok) {
                const json = await res.json();
                throw new Error(json.error || "Failed to delete task");
            }

            router.push("/dashboard/tasks");
            router.refresh();
        } catch (err: any) {
            setError(err.message);
            setLoading(false);
        }
    };

    return (
        <div className="bg-zinc-900/50 backdrop-blur-xl rounded-2xl shadow-2xl shadow-black/50 border border-zinc-800/50 overflow-hidden">
            <div className="p-8 sm:p-10">

                <div className="flex justify-between items-start mb-8">
                    <h2 className="text-2xl font-bold text-white">Task Details</h2>
                    <button
                        onClick={handleDelete}
                        disabled={loading}
                        className="text-red-400 hover:text-red-300 hover:bg-red-500/10 px-4 py-2 rounded-lg transition-colors font-medium flex items-center gap-2"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18" /><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" /><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" /><line x1="10" x2="10" y1="11" y2="17" /><line x1="14" x2="14" y1="11" y2="17" /></svg>
                        Delete Task
                    </button>
                </div>

                {success && (
                    <div className="mb-6 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-4 py-3 rounded-xl flex items-center gap-3 animate-in fade-in slide-in-from-top-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
                        <span className="font-medium">Task updated successfully!</span>
                    </div>
                )}

                {error && (
                    <div className="mb-6 bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-xl flex items-center gap-3 animate-in fade-in slide-in-from-top-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="12" x2="12" y1="8" y2="12" /><line x1="12" x2="12.01" y1="16" y2="16" /></svg>
                        <span className="font-medium">{error}</span>
                    </div>
                )}

                <form onSubmit={handleUpdate} className="space-y-6">

                    {/* Title Input */}
                    <div className="space-y-2">
                        <label htmlFor="title" className="block text-sm font-semibold text-zinc-300">
                            Task Title
                        </label>
                        <input
                            type="text"
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                            className="w-full px-4 py-3 rounded-xl bg-zinc-950/50 border border-zinc-800 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all duration-200 ease-in-out outline-none text-zinc-100 font-medium"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Due Date Input */}
                        <div className="space-y-2">
                            <label htmlFor="due_at" className="block text-sm font-semibold text-zinc-300">
                                Due Date
                            </label>
                            <input
                                type="datetime-local"
                                id="due_at"
                                value={dueAt}
                                onChange={(e) => setDueAt(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl bg-zinc-950/50 border border-zinc-800 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all duration-200 ease-in-out outline-none text-zinc-400 font-medium [&::-webkit-calendar-picker-indicator]:invert"
                            />
                        </div>

                        {/* Status Select */}
                        <div className="space-y-2">
                            <label htmlFor="status" className="block text-sm font-semibold text-zinc-300">
                                Status
                            </label>
                            <div className="relative">
                                <select
                                    id="status"
                                    value={status}
                                    onChange={(e) => setStatus(e.target.value as any)}
                                    className="w-full px-4 py-3 rounded-xl bg-zinc-950/50 border border-zinc-800 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all duration-200 ease-in-out outline-none text-zinc-300 font-medium appearance-none"
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
                                    Saving...
                                </>
                            ) : (
                                <>
                                    Save Changes
                                </>
                            )}
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
}
