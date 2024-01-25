import { ExercicioDTO } from '../../DTO';
import { Exercicio } from '../../entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ORMTreino } from './ORMtreino';

@Entity('exercicio')
export class ORMExercicio {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  urlCapa?: string;

  @Column({ type: 'varchar', length: 64, nullable: true })
  nomeExercicio?: string;

  @Column({ type: 'varchar', length: 64, nullable: true })
  quantidadeSeries?: string;

  @Column({ type: 'varchar', length: 64, nullable: true })
  quantidadeRepeticao?: string;

  @Column({ type: 'varchar', length: 64, nullable: true })
  cargaExercicio?: string;

  @Column({ type: 'int', nullable: true })
  tempoExercicio?: number;

  @Column({ type: 'int', nullable: true })
  quantidadeSeriesConcluidas?: number;

  @Column({ type: 'boolean', nullable: true })
  exercicioConcluido?: boolean;

  @ManyToOne(() => ORMTreino, (treino) => treino, {
    eager: false,
  })
  @JoinColumn({ name: 'treinoId' })
  @Column()
  treinoId!: string;

  static import(instance: Exercicio): ORMExercicio {
    const entity = new ORMExercicio();
    entity.id = instance.id;
    entity.urlCapa = instance.urlCapa;
    entity.nomeExercicio = instance.nomeExercicio;
    entity.quantidadeSeries = instance.quantidadeSeries;
    entity.quantidadeRepeticao = instance.quantidadeRepeticao;
    entity.cargaExercicio = instance.cargaExercicio;
    entity.tempoExercicio = instance.tempoExercicio;
    entity.quantidadeSeriesConcluidas = instance.quantidadeSeriesConcluidas;
    entity.exercicioConcluido = instance.exercicioConcluido;
    entity.treinoId = instance.treinoId;

    return entity;
  }

  export(): Exercicio {
    console.log('this.treinoId', this.treinoId);

    const retrievedData: ExercicioDTO = {
      id: this.id,
      urlCapa: this.urlCapa,
      nomeExercicio: this.nomeExercicio,
      quantidadeSeries: this.quantidadeSeries,
      quantidadeRepeticao: this.quantidadeRepeticao,
      cargaExercicio: this.cargaExercicio,
      treinoId: this.treinoId,
      tempoExercicio: this.tempoExercicio,
      quantidadeSeriesConcluidas: this.quantidadeSeriesConcluidas,
      exercicioConcluido: this.exercicioConcluido,
    };

    const buildExercicio = Exercicio.build(retrievedData);
    if (buildExercicio.isFailure) {
      throw buildExercicio.error;
    }
    return buildExercicio.getValue();
  }
}
