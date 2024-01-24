import { ApiBodyOptions, ApiProperty } from '@nestjs/swagger';

class CreateExerciseProps {
  @ApiProperty({
    example: 'ABC123',
    required: false,
  })
  refExercise?: string;

  @ApiProperty({
    example: 'https://example.com/imidade.jpg',
    required: false,
  })
  urlCapa?: string;

  @ApiProperty({
    example: 'Squat',
    required: false,
  })
  nomeExercicio?: string;

  @ApiProperty({
    example: '3',
    required: false,
  })
  quantidadeSeries?: string;

  @ApiProperty({
    example: '12',
    required: false,
  })
  quantidadeRepeticao?: string;

  @ApiProperty({
    example: '100kg',
    required: false,
  })
  cargaExercicio?: string;

  @ApiProperty({
    example: 60,
    required: false,
  })
  tempoExercicio?: number;

  @ApiProperty({
    example: 2,
    required: false,
  })
  quantidadeSeriesConcluidas?: number;

  @ApiProperty({
    example: true,
    required: false,
  })
  exercicioConcluido?: boolean;
}

export const BodyCreateExerciseOptions: ApiBodyOptions = {
  type: CreateExerciseProps,
};

export class ExerciseSchema {}
