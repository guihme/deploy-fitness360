import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ORMExercicio } from './ORMexercicio';
import { Treino } from 'src/entity';
import { TreinoDTO } from 'src/DTO';

@Entity('treino')
export class ORMTreino {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  urlCapa?: string;

  @Column({ type: 'varchar', length: 64, nullable: true })
  nomeTreino?: string;

  @Column({ type: 'varchar', length: 64, nullable: true })
  tipoExecucao?: string;

  @Column({ type: 'varchar', length: 64, nullable: true })
  diasSemana?: string;

  @Column({ type: 'int', nullable: true })
  numeroExercicios?: number;

  @OneToMany(() => ORMExercicio, (exercicio) => exercicio.treinoId, {
    cascade: true,
  })
  exercicios?: ORMExercicio[];

  static import(instance: Treino): ORMTreino {
    const entity = new ORMTreino();
    entity.id = instance.id;
    entity.urlCapa = instance.urlCapa;
    entity.nomeTreino = instance.nomeTreino;
    entity.tipoExecucao = instance.tipoExecucao;
    entity.diasSemana = instance.diasSemana;
    entity.numeroExercicios = instance.numeroExercicios;
    entity.exercicios = instance.exercicios?.map((exercicio) =>
      ORMExercicio.import(exercicio),
    );

    return entity;
  }

  export(): Treino {
    const retrievedData: TreinoDTO = {
      id: this.id,
      urlCapa: this.urlCapa,
      nomeTreino: this.nomeTreino,
      tipoExecucao: this.tipoExecucao,
      diasSemana: this.diasSemana,
      numeroExercicios: this.numeroExercicios,
      exercicios: this.exercicios?.map((exercicio) =>
        exercicio.export().toDTO(),
      ),
    };

    const buildTreino = Treino.build(retrievedData);
    if (buildTreino.isFailure) {
      throw buildTreino.error;
    }
    return buildTreino.getValue();
  }
}
