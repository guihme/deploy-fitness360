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

export class PessoaSchema {}
