export type AIAction =
    | {
        type: "createTask";
        title: string;
        due_at?: string | null;
    }
    | {
        type: "updateTask";
        taskId: string;
        title?: string;
        due_at?: string | null;
        status?: "pending" | "done";
    }
    | {
        type: "deleteTask";
        taskId: string;
    }
    | {
        type: "listTasks";
    };