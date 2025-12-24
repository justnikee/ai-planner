"use client";
import { useState } from "react";
import { toast } from "sonner";
import { Sparkles, ArrowUp, Command } from "lucide-react";

export default function AIInput() {
    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!message.trim()) return;

        setIsLoading(true);
        const loadingToast = toast.loading("Planning your request...");

        try {
            const res = await fetch("/api/ai", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ message })
            });

            if (!res.ok) throw new Error("Failed to process request");

            const data = await res.json();
            console.log(data);

            toast.dismiss(loadingToast);
            toast.success("Task processed successfully", {
                description: "Your dashboard has been updated."
            });
            setMessage("");
        } catch (error) {
            console.error("Error submitting:", error);
            toast.dismiss(loadingToast);
            toast.error("Something went wrong", {
                description: "Please try again later."
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full max-w-3xl mx-auto relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-2xl opacity-20 group-hover:opacity-40 blur transition duration-500"></div>
            <form onSubmit={handleSubmit} className="relative bg-zinc-900/90 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl overflow-hidden">
                <div className="flex items-center px-4 py-4">
                    <Sparkles className={`w-5 h-5 text-blue-500 mr-4 ${isLoading ? 'animate-pulse' : ''}`} />
                    <input
                        type="text"
                        name="message"
                        placeholder="Ask AI to plan your day..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        disabled={isLoading}
                        className="w-full bg-transparent text-white text-lg placeholder-zinc-500 focus:outline-none font-medium leading-relaxed"
                        autoComplete="off"
                    />
                    <div className="flex items-center gap-2 ml-4">
                        <kbd className="hidden md:inline-flex h-6 items-center gap-1 rounded border border-white/10 bg-white/5 px-2 font-mono text-[10px] font-medium text-zinc-400">
                            <Command className="w-3 h-3" /> K
                        </kbd>
                        <button
                            type="submit"
                            disabled={isLoading || !message.trim()}
                            className={`p-2 rounded-xl transition-all duration-200 ${message.trim()
                                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25 hover:bg-blue-500'
                                    : 'bg-white/5 text-zinc-600 cursor-not-allowed'
                                }`}
                        >
                            {isLoading ? (
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                                <ArrowUp className="w-5 h-5" />
                            )}
                        </button>
                    </div>
                </div>
            </form>
            <div className="absolute top-full left-0 right-0 mt-4 flex justify-center gap-4 text-xs text-zinc-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span>✨ Add tasks</span>
                <span>📅 Schedule meetings</span>
                <span>🔍 Update status</span>
            </div>
        </div>
    );
}