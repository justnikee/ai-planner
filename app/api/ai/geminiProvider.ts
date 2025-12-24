import { AIAction } from "./types";

export async function geminiProvider(message: string): Promise<AIAction> {
    if (message.toLowerCase().includes("add")) {
        return {
            type: "createTask",
            title: message,
            due_at: null,
        }
    }


    return {
        type: "listTasks",
    }
}