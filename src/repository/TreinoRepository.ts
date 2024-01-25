import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, QueryFailedError } from 'typeorm';
import { Result } from 'src/shared/result';
import { Treino } from 'src/entity';
import { ORMTreino } from './entity/ORMtreino';

@Injectable()
export class TreinoRepository {
  constructor(
    @InjectRepository(ORMTreino)
    private readonly repository: Repository<ORMTreino>,
  ) {}

  async save(data: Treino): Promise<Result<void>> {
    try {
      await this.repository.save(ORMTreino.import(data));
      return Result.ok();
    } catch (e) {
      if (e instanceof QueryFailedError) {
        return Result.fail(e);
      }
      throw e;
    }
  }

  async all(): Promise<Result<Treino[]>> {
    const TreinosORM = await this.repository.find({
      relations: ['exercicios'],
    });

    const TreinosEntity: Treino[] = [];
    for (const TreinoORM of TreinosORM) {
      const TreinoEntity = TreinoORM.export();
      TreinosEntity.push(TreinoEntity);
    }

    return Result.ok(TreinosEntity);
  }

  async findById(id: string): Promise<Result<Treino>> {
    const TreinoORM = await this.repository.findOne({
      where: { id: id },
      relations: ['exercicios'],
    });

    if (!TreinoORM) {
      return Result.fail(new Error('Not found!'));
    }
    return Result.ok(TreinoORM.export());
  }

  async delete(id: string): Promise<Result<void>> {
    try {
      const Treino = await this.repository.findOne({ where: { id } });
      if (!Treino) return Result.fail(new Error());
      await this.repository.delete({ id: Treino.id });
      return Result.ok<void>();
    } catch (e) {
      if (e instanceof QueryFailedError) {
        return Result.fail(new Error());
      }
      throw e;
    }
  }
}
