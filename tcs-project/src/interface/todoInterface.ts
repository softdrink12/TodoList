export interface TodoItem {
    id: string; // id
    name: string;   // 할 일
    description: string;    // 세부내용
    createdAt: string | Date;   // 생성한 날짜
    updateAt: string | Date | null; // 업데이트한 날짜
    startDateAt: string | Date | null;  // 시작한 날짜
    dueDateAt: string | Date | null;    // 종료한 날짜
    status: "IN PROCESS" | "DONE" | "IDLE"; // 현재 상태
}

// TodoList
export interface TodoList {
    todos: TodoItem[];
}