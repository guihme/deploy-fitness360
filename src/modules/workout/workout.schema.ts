import { ApiBodyOptions, ApiProperty } from '@nestjs/swagger';
import { ExerciseSchema } from '../exercise/exercise.schema';

class CreateTreinoProps {
  @ApiProperty({
    example: 'https://example.com/cover.jpg',
    required: false,
  })
  urlCapa?: string;

  @ApiProperty({
    example: 'Full Body Treino',
    required: false,
  })
  nomeTreino?: string;

  @ApiProperty({
    example: 'Strength Training',
    required: false,
  })
  tipoExecucao?: string;

  @ApiProperty({
    example: 'Mon,Tue,Thu,Sat',
    required: false,
  })
  diasSemana?: string;

  @ApiProperty({
    example: 5,
    required: false,
  })
  numeroExercicios?: number;
}

export const BodyCreateTreinoOptions: ApiBodyOptions = {
  type: CreateTreinoProps,
};

export class TreinoSchema {}
