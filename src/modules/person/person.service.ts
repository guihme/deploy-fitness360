import { Injectable } from '@nestjs/common';
import { CriarPessoaProps, Pessoa } from '../../entity';
import { Result } from 'src/shared/result';
import { PessoaRepository } from '../../repository';
import { PessoaDTO } from 'src/DTO';

@Injectable()
export class PessoaService {
  constructor(protected readonly pessoaRepository: PessoaRepository) {}

  public async createAndSave(data: CriarPessoaProps): Promise<Result<Pessoa>> {
    const created = Pessoa.create(data);
    if (created.isFailure) {
      return created;
    }

    const saved = await this.pessoaRepository.save(created.getValue());

    if (saved.isFailure) {
      return Result.fail(new Error('Error saving pessoa data.'));
    }

    return created;
  }

  public async getAll(): Promise<Result<Pessoa[]>> {
    return await this.pessoaRepository.all();
  }

  async findById(id: string): Promise<Result<Pessoa>> {
    return await this.pessoaRepository.findById(id);
  }

  async update(data: CriarPessoaProps, id: string): Promise<Result<Pessoa>> {
    const pessoa = await this.findById(id);

    if (pessoa.isFailure) {
      return Result.fail(pessoa.error);
    }

    const pessoaDTO: PessoaDTO = {
      id: id,
      ...data,
    };

    const build = Pessoa.build(pessoaDTO);

    if (build.isFailure) {
      return Result.fail(build.error);
    }

    const saved = await this.pessoaRepository.save(build.getValue());

    if (saved.isFailure) {
      return Result.fail(new Error('Error updating pessoa data.'));
    }

    return build;
  }

  async delete(id: string): Promise<Result<void>> {
    return this.pessoaRepository.delete(id);
  }
}
