import { AIAction } from "./types";
import { createTaskForUser } from "../service/taskService";


function getBaseUrl() {
    if (process.env.NEXT_PUBLIC_SITE_URL) {
        return process.env.NEXT_PUBLIC_SITE_URL;
    }

    // fallback for local dev
    return "http://localhost:3000";
}

export async function executor(userId: string, action: AIAction): Promise<any> {
    switch (action.type) {
        case "createTask":
            return createTaskForUser(userId, action)
        case "updateTask":
            return fetch(`${getBaseUrl()}/api/v1/tasks/${action.taskId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(action)
            })
        case "deleteTask":
            return fetch(`${getBaseUrl()}/api/v1/tasks/${action.taskId}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                }
            })
        case "listTasks":
            return { ok: true };
        default:
            throw new Error("Unknown AI action");
    }
}