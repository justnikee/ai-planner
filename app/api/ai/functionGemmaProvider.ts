import { AIAction } from "./types";

export async function functionGemmaProvider(message: string): Promise<AIAction> {
    return {
        type: "listTasks",
    };
}