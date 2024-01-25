import { PessoaDTO } from 'src/DTO';
import { Pessoa } from 'src/entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('pessoa')
export class ORMPessoa {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', length: 64, nullable: false })
  altura!: string;

  @Column({ type: 'varchar', length: 64, nullable: false })
  peso!: string;

  @Column({ type: 'varchar', length: 64, nullable: false })
  idade!: string;

  @Column({ type: 'varchar', length: 64, nullable: false })
  sexo!: string;

  @Column({ type: 'varchar', length: 64, nullable: false })
  imc!: string;

  static import(instance: Pessoa): ORMPessoa {
    const entity = new ORMPessoa();
    entity.id = instance.id;
    entity.altura = instance.altura;
    entity.peso = instance.peso;
    entity.idade = instance.idade;
    entity.sexo = instance.sexo;
    entity.imc = instance.imc;

    return entity;
  }

  export(): Pessoa {
    const retrievedData: PessoaDTO = {
      id: this.id,
      altura: this.altura,
      peso: this.peso,
      idade: this.idade,
      sexo: this.sexo,
      imc: this.imc,
    };

    const buildPerson = Pessoa.build(retrievedData);
    if (buildPerson.isFailure) {
      throw buildPerson.error;
    }
    return buildPerson.getValue();
  }
}
