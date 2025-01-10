import { Module } from '@nestjs/common';
import { TodoService } from './todoService';
import { TodoController } from './todoController';

// 모듈설정: 코드의 재사용성과 유지보수성을 높이기 위해 코드를 분리하는 기능
@Module({
    controllers: [TodoController],
    providers: [TodoService],   // providers: TodoService를 등록
})
export class TodoModule {}