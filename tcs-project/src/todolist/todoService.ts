import { Injectable } from '@nestjs/common';
import { TodoItem, TodoList } from '../interface/todoInterface';
import { readFile, WriteFile } from '../utils/file';
import { v4 as uuidv4 } from 'uuid';    // uuidv4라는 라이브러리를 사용해서 고유 id 생성


const FILE_PATH = './data/todos.json';

@Injectable() // 의존성 주입
export class TodoService {
    // TodoList 가져오기
    async getTodos(status?: TodoItem['status']): Promise<TodoList> {    // status 값으로 검색 가능, aysnc: promise를 자동으로 반환
        const data: TodoList = await readFile(FILE_PATH);   // FILE_PATH: file을 읽고 쓰는?
        if (status) {
            return {todos: data.todos.filter((todo) => todo.status === status)};
        }
        return data;
    }

    // TodoList One
    async getTodoId(id: string): Promise<TodoItem | null> { // id 값으로 검색 가능, promise: 비동기 작업을 처리하기 위한 객체
        const data: TodoList = await readFile(FILE_PATH);   // await: promise가 해결된 후 결과 값을 반환
        return data.todos.find((todo) => todo.id === id) || null;
    }

    // TodoList Create
    async createTodo(name: string, description = ''): Promise<TodoItem> {
        const newTodo: TodoItem = {
            id: uuidv4(),
            name,
            description,
            createdAt: new Date().toISOString(),
            updateAt: null,
            startDateAt: null,
            dueDateAt: null,
            status: 'IDLE',
        };

        const data: TodoList = await readFile(FILE_PATH);
        data.todos.push(newTodo);
        await WriteFile(FILE_PATH, data);
        return newTodo;
    }

    // TodoList Update
    async updateTodo(id: string, updateData: Partial<TodoItem>): Promise<TodoItem | null> {
        const data: TodoList = await readFile(FILE_PATH);
        const todoIndex = data.todos.findIndex((todo) => todo.id === id);

        if(todoIndex === -1) return null;

        data.todos[todoIndex] = {
            ...data.todos[todoIndex],   // ...: 객체나 배열을 펼쳐서 복사하거나 다른 객체나 배열에 병합할 때 사용
            ...updateData,
            updateAt: new Date().toISOString(),
        };
        await WriteFile(FILE_PATH, data);
        return data.todos[todoIndex];
    }

    // TodoList Delete
    async deleteTodo(id: string): Promise<boolean> {
        const data: TodoList = await readFile(FILE_PATH);
        const initalLength = data.todos.length;
        data.todos = data.todos.filter((todo) => todo.id !== id);
        await WriteFile(FILE_PATH, data);
        return data.todos.length < initalLength;
    }

}