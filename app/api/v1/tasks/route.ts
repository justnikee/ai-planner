import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { TaskStatus } from "@prisma/client";
import { createClient } from '@/utils/supabase/server'


interface CreateTaskBody {
    id?: string
    title: string;
    due_at?: string;
    status?: TaskStatus;
}

export async function POST(request: Request) {

    const supabase = await createClient();
    const { data: { session } } = await supabase.auth.getSession()


    if (!session || !session.user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    console.log(session.user.id)

    const { title, due_at, status }: CreateTaskBody = await request.json();

    if (!title) {
        return NextResponse.json({ error: "Title is required" }, { status: 400 });
    }

    const task = await prisma.task.create({
        data: {
            userId: session.user.id,
            title: title,
            due_at: due_at ? new Date(due_at) : null,
            status: status || TaskStatus.pending,
        }
    })

    return NextResponse.json(task);
}


export async function GET() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user || !user.id) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const tasks = await prisma.task.findMany({
        where: {
            userId: user.id
        }
    });
    return NextResponse.json(tasks);
}

// patch 

