import { ApiBodyOptions, ApiProperty } from '@nestjs/swagger';

class CriarPessoaProps {
  @ApiProperty({
    example: '180cm',
  })
  altura: string;

  @ApiProperty({
    example: '75kg',
  })
  peso: string;

  @ApiProperty({
    example: '25',
  })
  idade: string;

  @ApiProperty({
    example: 'male',
  })
  sexo: string;

  @ApiProperty({
    example: '27.5',
  })
  imc: string;
}

export const BodyCreatePessoaOptions: ApiBodyOptions = {
  type: CriarPessoaProps,
};

class gemeoProps {
  @ApiProperty({
    example: '7c660ba9-ff06-4c3f-a755-41a21b6d3341',
  })
  id_pessoa: string;

  @ApiProperty({
    example: '3000',
  })
  kcal: number;
  @ApiProperty({
    example: '7',
  })
  diasTotais: number;

  @ApiProperty({
    example: '2',
  })
  freqSemanal: number;
}

export const BodyGemeoOptions: ApiBodyOptions = {
  type: gemeoProps,
};
export class PessoaSchema {}
