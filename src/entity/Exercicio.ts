import * as Joi from 'joi';
import { ExercicioDTO } from 'src/DTO';
import { Result } from 'src/shared/result';
import { v4 as uuidv4 } from 'uuid';

export interface CriarExercicioProps {
  urlCapa?: string;
  nomeExercicio?: string;
  quantidadeSeries?: string;
  quantidadeRepeticao?: string;
  cargaExercicio?: string;
  tempoExercicio?: number;
  quantidadeSeriesConcluidas?: number;
  exercicioConcluido?: boolean;
  treinoId: string;
}

export interface ExercicioProps {
  id: string;
  urlCapa?: string;
  nomeExercicio?: string;
  quantidadeSeries?: string;
  quantidadeRepeticao?: string;
  cargaExercicio?: string;
  tempoExercicio?: number;
  quantidadeSeriesConcluidas?: number;
  exercicioConcluido?: boolean;
  treinoId: string;
}

export class Exercicio {
  protected readonly _id: string;

  constructor(protected props: ExercicioProps) {
    this.props = props;
    this._id = props.id;
  }

  get id(): string {
    return this._id;
  }

  get urlCapa(): string | undefined {
    return this.props.urlCapa;
  }

  get nomeExercicio(): string | undefined {
    return this.props.nomeExercicio;
  }

  get quantidadeSeries(): string | undefined {
    return this.props.quantidadeSeries;
  }

  get quantidadeRepeticao(): string | undefined {
    return this.props.quantidadeRepeticao;
  }

  get cargaExercicio(): string | undefined {
    return this.props.cargaExercicio;
  }

  get tempoExercicio(): number | undefined {
    return this.props.tempoExercicio;
  }

  get quantidadeSeriesConcluidas(): number | undefined {
    return this.props.quantidadeSeriesConcluidas;
  }

  get exercicioConcluido(): boolean | undefined {
    return this.props.exercicioConcluido;
  }

  get treinoId(): string {
    return this.props.treinoId;
  }

  static validate(data: ExercicioProps): Result<ExercicioProps> {
    console.log('validate: ', data);

    const exerciseObject = {
      id: Joi.string().guid({ version: 'uuidv4' }),
      urlCapa: Joi.string().optional(),
      nomeExercicio: Joi.string().optional(),
      quantidadeSeries: Joi.string().optional(),
      quantidadeRepeticao: Joi.string().optional(),
      cargaExercicio: Joi.string().optional(),
      tempoExercicio: Joi.number().optional(),
      quantidadeSeriesConcluidas: Joi.number().optional(),
      exercicioConcluido: Joi.boolean().optional(),
      treinoId: Joi.string().required(),
    };

    const { value, error } = Joi.object(exerciseObject)
      .unknown()
      .validate(data);

    if (error) {
      return Result.fail(error);
    }

    return Result.ok(value);
  }

  static create(data: CriarExercicioProps): Result<Exercicio> {
    const validado = this.validate({
      ...data,
      id: uuidv4(),
    });

    if (validado.isFailure) {
      return Result.fail(validado.error);
    }

    return Result.ok(new Exercicio(validado.getValue()));
  }

  static build(data: ExercicioDTO): Result<Exercicio> {
    const validado = this.validate({
      ...data,
    });

    if (validado.isFailure) {
      return Result.fail(validado.error);
    }

    return Result.ok(new Exercicio(validado.getValue()));
  }

  toDTO(): ExercicioDTO {
    return {
      ...this.props,
    };
  }
}
