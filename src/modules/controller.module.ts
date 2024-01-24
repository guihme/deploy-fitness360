import { Module } from '@nestjs/common';
import { PessoaModule } from './person/person.module';
import { ExercicioModule } from './exercise/exercise.module';
import { TreinoModule } from './workout/workout.module';

@Module({
  imports: [PessoaModule, ExercicioModule, TreinoModule],
  providers: [],
})
export class controllerModule {}
