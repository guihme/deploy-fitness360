import { Module } from '@nestjs/common';
import { TreinoController } from './workout.controller';
import { TreinoService } from './workout.service';

@Module({
  exports: [TreinoService],
  controllers: [TreinoController],
  providers: [TreinoService],
})
export class TreinoModule {}
