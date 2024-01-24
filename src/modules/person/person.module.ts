import { Module } from '@nestjs/common';
import { PessoaService } from './person.service';
import { PessoaController } from './person.controller';

@Module({
  providers: [PessoaService],
  controllers: [PessoaController],
  exports: [PessoaService],
})
export class PessoaModule {}
