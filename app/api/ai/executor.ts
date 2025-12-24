import { AIAction } from "./types";

export async function executor(action: AIAction): Promise<any> {
    switch (action.type) {
        case "createTask":
            return fetch("/api/v1/tasks", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(action)
            })
        case "updateTask":
            return fetch(`/api/v1/tasks/${action.taskId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(action)
            })
        case "deleteTask":
            return fetch(`/api/v1/tasks/${action.taskId}`, {
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