import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Pessoa } from '../entity'; // Certifique-se de ter importado a classe Pessoa correta
import { QueryFailedError, Repository } from 'typeorm';
import { ORMPessoa } from './entity'; // Certifique-se de ter importado a classe ORMPessoa correta
import { Result } from 'src/shared/result';

@Injectable()
export class PessoaRepository {
  constructor(
    @InjectRepository(ORMPessoa)
    private readonly repository: Repository<ORMPessoa>,
  ) {}

  async save(data: Pessoa): Promise<Result<void>> {
    try {
      await this.repository.save(ORMPessoa.import(data));

      return Result.ok();
    } catch (e) {
      if (e instanceof QueryFailedError) {
        return Result.fail(e);
      }
      throw e;
    }
  }

  async all(): Promise<Result<Pessoa[]>> {
    const PessoasORM = await this.repository.find();

    const PessoasEntity: Pessoa[] = [];
    for (const PessoaORM of PessoasORM) {
      const PessoaEntity = PessoaORM.export();
      PessoasEntity.push(PessoaEntity);
    }
    return Result.ok(PessoasEntity);
  }

  async findById(id: string): Promise<Result<Pessoa>> {
    const PessoaORM = await this.repository.findOne({ where: { id } });
    if (!PessoaORM) {
      return Result.fail(new Error('Not found!'));
    }
    return Result.ok(PessoaORM.export());
  }

  async delete(id: string): Promise<Result<void>> {
    try {
      const pessoa = await this.repository.findOne({ where: { id } });
      if (!pessoa) return Result.fail(new Error());
      await this.repository.delete({ id: pessoa.id });
      return Result.ok<void>();
    } catch (e) {
      if (e instanceof QueryFailedError) {
        return Result.fail(new Error());
      }
      throw e;
    }
  }
}
