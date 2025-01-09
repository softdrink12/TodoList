import { Controller, Get, Post, Put, Delete, Param, Query, Body } from '@nestjs/common';
import { TodoService } from './todoService';
import { TodoItem } from '../interface/todo.interface';

@Controller('todos')
export class TodoController {
    constructor(private readonly todoService: TodoService) {}

    // 모든 TodoList
    @Get()
    async getTodos(@Query('status') status?: TodoItem['status']) {
        return this.todoService.getTodos(status);
    }

    // TodoList One
    @Get(':id')
    async getTodoId(@Param('id') id: string) {
        return this.todoService.getTodoId(id);
    }

    // Create TodoList
    @Post()
    async createTodo(@Body() body: {name: string; description?: string}) {
        return this.todoService.createTodo(body.name, body.description);
    }
    
    // Update TodoList
    @Put(':id')
    async updateTodo(@Param('id') id: string, @Body() updateData: Partial<TodoItem>) {
        return this.todoService.updateTodo(id, updateData);
    }

    // Delete TodoList
    @Delete(':id')
    async deleteTodo(@Param('id') id:string) {
        return this.todoService.deleteTodo(id);
    }

}