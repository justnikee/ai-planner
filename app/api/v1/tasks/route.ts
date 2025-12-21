import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { TaskStatus } from "@/app/generated/prisma/enums";

interface CreateTaskBody {
    title: string;
    due_at?: string;
    status?: TaskStatus;
}

export async function POST(request: Request) {
    const { title, due_at, status }: CreateTaskBody = await request.json();

    if (!title) {
        return NextResponse.json({ error: "Title is required" }, { status: 400 });
    }

    const task = await prisma.task.create({
        data: {
            title: title,
            due_at: due_at ? new Date(due_at) : null,
            status: status || 'pending'
        }
    })

    return NextResponse.json(task);
}


export async function GET() {
    const tasks = await prisma.task.findMany();
    return NextResponse.json(tasks);
}