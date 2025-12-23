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

export async function PATCH(request: Request) {
    try {
        const supabase = await createClient();
        const { data: { session } } = await supabase.auth.getSession()

        if (!session || !session.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { id, title, due_at, status }: CreateTaskBody = await request.json();
        const task = await prisma.task.update({
            where: {
                id: id
            },
            data: {
                title: title,
                due_at: due_at ? new Date(due_at) : null,
                status: status || TaskStatus.pending,
            }
        });

        return NextResponse.json(task);
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}


export async function DELETE(request: Request) {
    try {
        const supabase = await createClient();
        const { data: { session } } = await supabase.auth.getSession();

        if (!session || !session.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { id } = await request.json();
        const task = await prisma.task.delete({
            where: {
                id: id
            }
        });

        return NextResponse.json(task);
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}