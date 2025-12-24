import { TaskStatus } from "@prisma/client";
import { prisma } from "@/lib/prisma";

export async function createTaskForUser(userId: string, data: { title: string, due_at?: string, status?: string }) {
    let status: TaskStatus | undefined;

    if (data.status && Object.values(TaskStatus).includes(data.status as TaskStatus)) {
        status = data.status as TaskStatus;
    }

    return await prisma.task.create({
        data: {
            userId: userId,
            title: data.title,
            due_at: data.due_at ? new Date(data.due_at) : null,
            status: status
        }
    })
}