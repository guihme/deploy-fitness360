import * as Joi from 'joi';
import { Result } from 'src/shared/result';
import { v4 as uuidv4 } from 'uuid';
import { TreinoDTO } from '../DTO';
import { Exercicio } from './Exercicio';

export interface CriarTreinoProps {
  urlCapa?: string;
  nomeTreino?: string;
  tipoExecucao?: string;
  diasSemana?: string;
  numeroExercicios?: number;
}

export interface TreinoProps {
  id: string;
  urlCapa?: string;
  nomeTreino?: string;
  tipoExecucao?: string;
  diasSemana?: string;
  numeroExercicios?: number;
  exercicios?: Exercicio[];
}

export class Treino {
  protected readonly _id: string;

  constructor(protected props: TreinoProps) {
    this.props = props;
    this._id = props.id;
  }

  get id(): string {
    return this._id;
  }

  get urlCapa(): string | undefined {
    return this.props.urlCapa;
  }

  get nomeTreino(): string | undefined {
    return this.props.nomeTreino;
  }

  get tipoExecucao(): string | undefined {
    return this.props.tipoExecucao;
  }

  get diasSemana(): string | undefined {
    return this.props.diasSemana;
  }

  get numeroExercicios(): number | undefined {
    return this.props.numeroExercicios;
  }

  get exercicios(): Exercicio[] | undefined {
    return this.props.exercicios;
  }

  static validate(data: TreinoProps): Result<TreinoProps> {
    const treinoObject = {
      id: Joi.string().guid({ version: 'uuidv4' }),
      urlCapa: Joi.string().optional(),
      nomeTreino: Joi.string().optional(),
      tipoExecucao: Joi.string().optional(),
      diasSemana: Joi.string().optional(),
      numeroExercicios: Joi.number().optional(),
      exercicios: Joi.array().optional(),
    };

    const { value, error } = Joi.object(treinoObject)
      .unknown()
      .validate(data, { abortEarly: false });

    if (error) {
      return Result.fail(error);
    }

    return Result.ok(value);
  }

  static create(data: CriarTreinoProps): Result<Treino> {
    const validado = this.validate({
      ...data,
      id: uuidv4(),
    });

    if (validado.isFailure) {
      return Result.fail(validado.error);
    }

    return Result.ok(new Treino(validado.getValue()));
  }

  static build(data: TreinoDTO): Result<Treino> {
    const validado = this.validate({
      ...data,
      exercicios: data.exercicios?.map((exercicioDTO) =>
        Exercicio.build(exercicioDTO).getValue(),
      ),
    });

    if (validado.isFailure) {
      return Result.fail(validado.error);
    }

    return Result.ok(new Treino(validado.getValue()));
  }

  toDTO(): TreinoDTO {
    return {
      ...this.props,
      exercicios: this.props.exercicios?.map((exercicio) => exercicio.toDTO()),
    };
  }
}
