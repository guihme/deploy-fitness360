import { Injectable } from '@nestjs/common';
import { CriarExercicioProps, Exercicio } from '../../entity';
import { Result } from 'src/shared/result';
import { ExercicioRepository } from '../../repository';
import { ExercicioDTO } from 'src/DTO';

@Injectable()
export class ExercicioService {
  constructor(private readonly exercicioRepository: ExercicioRepository) {}

  public async createAndSave(
    data: CriarExercicioProps,
  ): Promise<Result<Exercicio>> {
    const created = Exercicio.create(data);
    if (created.isFailure) {
      return created;
    }
    console.log(data);
    
    const saved = await this.exercicioRepository.save(created.getValue());
    console.log(saved);
    
    if (saved.isFailure) {
      return Result.fail(new Error('Error saving Exercicio data.'));
    }

    return created;
  }

  public async getAll(): Promise<Result<Exercicio[]>> {
    return await this.exercicioRepository.all();
  }

  async findById(id: string): Promise<Result<Exercicio>> {
    return await this.exercicioRepository.findById(id);
  }

  async update(
    data: CriarExercicioProps,
    id: string,
  ): Promise<Result<Exercicio>> {
    let exercicio = await this.findById(id);

    if (exercicio.isFailure) {
      return Result.fail(exercicio.error);
    }

    const ExercicioDTO: ExercicioDTO = {
      id: id,
      ...data,
    };

    let build = Exercicio.build(ExercicioDTO);

    if (build.isFailure) {
      return Result.fail(build.error);
    }

    const saved = await this.exercicioRepository.save(build.getValue());

    if (saved.isFailure) {
      return Result.fail(new Error('Error updating Exercicio data.'));
    }

    return build;
  }

  async delete(id: string): Promise<Result<void>> {
    return this.exercicioRepository.delete(id);
  }
}
