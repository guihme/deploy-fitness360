import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Exercicio } from '../entity';
import { QueryFailedError, Repository } from 'typeorm';
import { ORMExercicio } from './entity';
import { Result } from 'src/shared/result';

@Injectable()
export class ExercicioRepository {
  constructor(
    @InjectRepository(ORMExercicio)
    private readonly repository: Repository<ORMExercicio>,
  ) {}

  async save(data: Exercicio): Promise<Result<void>> {
    try {
      await this.repository.save(ORMExercicio.import(data));

      return Result.ok();
    } catch (e) {
      if (e instanceof QueryFailedError) {
        return Result.fail(e);
      }
      throw e;
    }
  }

  async all(): Promise<Result<Exercicio[]>> {
    const ExerciciosORM = await this.repository.find();
    console.log('ExerciciosORM: ', ExerciciosORM);

    const ExerciciosEntity: Exercicio[] = [];
    for (const ExercicioORM of ExerciciosORM) {
      const ExercicioEntity = ExercicioORM.export();
      ExerciciosEntity.push(ExercicioEntity);
    }
    return Result.ok(ExerciciosEntity);
  }

  async findById(id: string): Promise<Result<Exercicio>> {
    const ExercicioORM = await this.repository.findOne({ where: { id } });
    if (!ExercicioORM) {
      return Result.fail(new Error('Not found!'));
    }
    return Result.ok(ExercicioORM.export());
  }

  async delete(id: string): Promise<Result<void>> {
    try {
      const Exercicio = await this.repository.findOne({ where: { id } });
      if (!Exercicio) return Result.fail(new Error());
      await this.repository.delete({ id: Exercicio.id });
      return Result.ok<void>();
    } catch (e) {
      if (e instanceof QueryFailedError) {
        return Result.fail(new Error());
      }
      throw e;
    }
  }
}
