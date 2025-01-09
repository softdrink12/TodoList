import { Module } from '@nestjs/common';
import { TodoService } from './todoService';
import { TodoController } from './todoController';

// 모듈설정?
@Module({
    controllers: [TodoController],
    providers: [TodoService],
})
export class TodoModule {}