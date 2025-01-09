export interface TodoItem {
    id: string;
    name: string;
    description: string;
    createdAt: string | Date;
    updateAt: string | Date | null;
    startDateAt: string | Date | null;
    dueDateAt: string | Date | null;
    status: "IN PROCESS" | "DONE" | "IDLE";
}

// TodoList
export interface TodoList {
    todos: TodoItem[];
}