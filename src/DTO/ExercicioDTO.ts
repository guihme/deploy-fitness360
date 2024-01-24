export class ExercicioDTO {
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
