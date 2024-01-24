import { ExercicioDTO } from 'src/DTO';

export class TreinoDTO {
  id: string;
  urlCapa?: string;
  nomeTreino?: string;
  tipoExecucao?: string;
  diasSemana?: string;
  numeroExercicios?: number;
  exercicios?: ExercicioDTO[];
}
