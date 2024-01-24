import { Module } from '@nestjs/common';
import { ExercicioService } from './exercise.service';
import { ExercicioController } from './exercise.controller';

@Module({
  providers: [ExercicioService],
  controllers: [ExercicioController],
  exports: [ExercicioService],
})
export class ExercicioModule {}
