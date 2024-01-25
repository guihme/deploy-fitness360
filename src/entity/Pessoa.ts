import * as Joi from 'joi';
import { Result } from '../shared/result';
import { v4 as uuidv4 } from 'uuid';
import { PessoaDTO } from '../DTO';

export interface CriarPessoaProps {
  altura: string;
  peso: string;
  idade: string;
  sexo: string;
  imc: string;
}

export interface PessoaProps {
  id: string;
  altura: string;
  peso: string;
  idade: string;
  sexo: string;
  imc: string;
}

export class Pessoa {
  protected readonly _id: string;

  constructor(protected props: PessoaProps) {
    this.props = props;
    this._id = props.id;
  }

  get id(): string {
    return this._id;
  }

  get altura(): string {
    return this.props.altura;
  }

  get peso(): string {
    return this.props.peso;
  }

  get idade(): string {
    return this.props.idade;
  }

  get sexo(): string {
    return this.props.sexo;
  }

  get imc(): string {
    return this.props.imc;
  }

  static validate(data: PessoaProps): Result<PessoaProps> {
    const pessoaObject = {
      id: Joi.string().guid({ version: 'uuidv4' }),
      altura: Joi.string().required(),
      peso: Joi.string().required(),
      idade: Joi.string().required(),
      sexo: Joi.string().required(),
      imc: Joi.string().required(),
    };

    const { value, error } = Joi.object(pessoaObject).unknown().validate(data);

    if (error) {
      return Result.fail(error);
    }

    return Result.ok(value);
  }

  static create(data: CriarPessoaProps): Result<Pessoa> {
    const validado = this.validate({
      ...data,
      id: uuidv4(),
    });

    if (validado.isFailure) {
      return Result.fail(validado.error);
    }

    return Result.ok(new Pessoa(validado.getValue()));
  }

  static build(data: PessoaDTO): Result<Pessoa> {
    const validado = this.validate({
      ...data,
    });

    if (validado.isFailure) {
      return Result.fail(validado.error);
    }

    return Result.ok(new Pessoa(validado.getValue()));
  }

  toDTO(): PessoaDTO {
    return {
      ...this.props,
    };
  }
}
