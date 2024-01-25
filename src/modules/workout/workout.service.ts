import { Injectable } from '@nestjs/common';
import { Result } from 'src/shared/result';
import { CriarTreinoProps, Treino } from '../../entity';
import { TreinoDTO } from 'src/DTO';
import { TreinoRepository } from 'src/repository';

@Injectable()
export class TreinoService {
  constructor(private readonly treinoRepository: TreinoRepository) {}

  public async createAndSave(data: CriarTreinoProps): Promise<Result<Treino>> {
    const createdTreino = Treino.create({
      ...data,
    });

    if (createdTreino.isFailure) {
      return createdTreino;
    }

    const saved = await this.treinoRepository.save(createdTreino.getValue());

    if (saved.isFailure) {
      return Result.fail(new Error('Error saving Treino data.'));
    }

    return createdTreino;
  }

  public async getAll(): Promise<Result<Treino[]>> {
    return await this.treinoRepository.all();
  }

  async findById(id: string): Promise<Result<Treino>> {
    return await this.treinoRepository.findById(id);
  }

  async update(data: CriarTreinoProps, id: string): Promise<Result<Treino>> {
    const treino = await this.findById(id);

    if (treino.isFailure) {
      return Result.fail(treino.error);
    }

    const TreinoDTO: TreinoDTO = {
      id: id,
      ...data,
    };

    const build = Treino.build(TreinoDTO);

    if (build.isFailure) {
      return Result.fail(build.error);
    }

    const saved = await this.treinoRepository.save(build.getValue());

    if (saved.isFailure) {
      return Result.fail(new Error('Error updating Treino data.'));
    }

    return build;
  }

  async delete(id: string): Promise<Result<void>> {
    return this.treinoRepository.delete(id);
  }
}
