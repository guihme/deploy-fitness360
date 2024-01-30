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
  async calculateDigitalTwin(data: {
    id_pessoa: string;
    kcal: number;
    diasTotais: number;
    freqSemanal: number;
  }): Promise<Result<Pessoa>> {
    const pessoa = await this.pessoaRepository.findById(data.id_pessoa);

    if (pessoa.isFailure) return pessoa;

    const pessoaData: CriarPessoaProps = {
      ...pessoa.getValue().toDTO(),
    };
    const totalDaysOfTrainning =
      Math.floor(data.diasTotais / 4) * data.freqSemanal;
    const totalKcalBurned = totalDaysOfTrainning * 500;
    const totalKcalGained = (data.kcal - 2400) * data.diasTotais;
    const result = (totalKcalGained - totalKcalBurned) / 7700;
    const oldPeso = Number(pessoaData.peso.replace(/\D/g, ''));
    const altura = Number(pessoaData.altura.replace(/\D/g, '')) / 100;
    const newPeso = oldPeso + result;

    pessoaData.peso = String(newPeso.toFixed(1)) + 'kg';
    pessoaData.imc = String((newPeso / (altura * altura)).toFixed(1));

    return Pessoa.create(pessoaData);
  }
}
