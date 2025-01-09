import { Injectable } from '@nestjs/common';
import { TodoItem, TodoList } from '../interface/todo.interface';
import { readFile, WriteFile } from '../utils/file';
import { v4 as uuidv4 } from 'uuid';


const FILE_PATH = './data/todos.json';

@Injectable()
export class TodoService {
    // TodoList 가져오기
    async getTodos(status?: TodoItem['status']): Promise<TodoList> {
        const data: TodoList = await readFile(FILE_PATH);
        if (status) {
            return {todos: data.todos.filter((todo) => todo.status === status)};
        }
        return data;
    }

    // TodoList One
    async getTodoId(id: string): Promise<TodoItem | null> {
        const data: TodoList = await readFile(FILE_PATH);
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
            ...data.todos[todoIndex],
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