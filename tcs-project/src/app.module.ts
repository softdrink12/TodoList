import { Module } from '@nestjs/common';
import { TodoModule } from './todolist/todoModule';

// TodoModule 추가
@Module({
  imports: [TodoModule],
})
export class AppModule {}

