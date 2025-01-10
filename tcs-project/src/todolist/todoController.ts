import { Controller, Get, Post, Put, Delete, Param, Query, Body } from '@nestjs/common';
import { TodoService } from './todoService';
import { TodoItem } from '../interface/todoInterface';

@Controller('todos')
export class TodoController {
    constructor(private readonly todoService: TodoService) {}

    // TodoList
    @Get()
    // @Query : 쿼리 파라미터 가져오기
    async getTodos(@Query('status') status?: TodoItem['status']) {  // ?: 옵셔널 속성, 속성이 있을 수도 있고 없을 수도 있음
        return this.todoService.getTodos(status);
    }

    // TodoList One
    @Get(':id')
    // @Param : URL에 있는 파라미터 가져오기
    async getTodoId(@Param('id') id: string) {
        return this.todoService.getTodoId(id);
    }

    // Create TodoList
    @Post()
    // @Body : Body를 가져옴
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