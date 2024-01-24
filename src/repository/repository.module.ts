import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ORMExercicio, ORMPessoa, ORMTreino } from './entity';
import { PessoaRepository } from './PessoaRepository';
import { ExercicioRepository } from './ExercicioRepository';
import { TreinoRepository } from './TreinoRepository';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([ORMPessoa, ORMExercicio, ORMTreino])],
  providers: [PessoaRepository, ExercicioRepository, TreinoRepository],
  exports: [PessoaRepository, ExercicioRepository, TreinoRepository],
})
export class RepositoryModule {}
