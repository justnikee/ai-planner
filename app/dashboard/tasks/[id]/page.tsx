import { prisma } from "@/lib/prisma";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import TaskDetails from "@/components/TaskDetails";
import Link from "next/link";

export default async function SingleTaskPage({ params }: { params: { id: string } }) {

    const supabase = await createClient();
    const { data: { session } } = await supabase.auth.getSession();

    if (!session || !session.user) {
        return redirect("/login");
    }

    const { id } = await params;

    const task = await prisma.task.findUnique({
        where: {
            id
        }
    })

    if (!task) {
        return redirect("/dashboard/tasks");
    }


    return (
        <div className="min-h-screen bg-zinc-950 text-zinc-100 p-6 md:p-12 font-sans selection:bg-indigo-500/30">
            <div className="max-w-2xl mx-auto mb-20">

                {/* Header Section */}
                <div className="mb-10 text-center md:text-left">
                    <div className="mb-6">
                        <Link
                            href="/dashboard/tasks"
                            className="text-zinc-500 hover:text-zinc-300 font-medium transition-colors duration-200 inline-flex items-center gap-2"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
                            Back to Dashboard
                        </Link>
                    </div>
                    <h1 className="text-4xl font-extrabold text-white tracking-tight sm:text-5xl mb-3">
                        Edit Task
                    </h1>
                    <p className="text-lg text-zinc-400 max-w-lg">
                        Update your task details or remove it from your planner.
                    </p>
                </div>

                <TaskDetails task={task} />

            </div>
        </div>
    )
}