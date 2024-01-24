import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { CriarPessoaProps } from 'src/entity';
import { PessoaDTO } from 'src/DTO';
import { PessoaService } from './person.service';
import { BodyCreatePessoaOptions } from './person.schema';

@ApiTags('pessoas')
@Controller('pessoas')
export class PessoaController {
  constructor(private readonly pessoaService: PessoaService) {}

  @ApiOperation({ summary: 'List all Pessoas' })
  @Get()
  async all(@Res() res: Response) {
    const result = await this.pessoaService.getAll();
    if (result.isFailure) {
      res.status(400).send(result.errorValue());
      return;
    }

    let pessoas = result.getValue();
    let pessoasDTO: PessoaDTO[] = [];

    for (let pessoa of pessoas) {
      pessoasDTO.push(pessoa.toDTO());
    }

    res.status(200).send(pessoasDTO);
  }

  @ApiOperation({ summary: 'Create a pessoa' })
  @ApiBody(BodyCreatePessoaOptions)
  @Post()
  async create(@Body() body: CriarPessoaProps, @Res() res: Response) {
    const result = await this.pessoaService.createAndSave(body);
    if (result.isFailure) {
      res.status(400).send(result.errorValue());
      return;
    }
    const pessoa = result.getValue();

    res.status(200).send(pessoa.toDTO());
  }

  @ApiOperation({ summary: 'Get a Pessoa' })
  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response) {
    const result = await this.pessoaService.findById(id);
    if (result.isFailure) {
      res.status(400).send(result.errorValue());
      return;
    }
    const pessoa = result.getValue();

    res.status(200).send(pessoa.toDTO());
  }

  @ApiOperation({ summary: 'Update a pessoa' })
  @ApiBody(BodyCreatePessoaOptions)
  @Put(':id')
  async update(
    @Body() data: CriarPessoaProps,
    @Param('id') id: string,
    @Res() res: Response,
  ) {
    const result = await this.pessoaService.update(data, id);
    if (result.isFailure) {
      res.status(400).send(result.errorValue());
      return;
    }
    const pessoa = result.getValue();

    res.status(200).send(pessoa.toDTO());
  }

  @ApiOperation({ summary: 'Remove a Pessoa' })
  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res: Response) {
    const result = await this.pessoaService.delete(id);
    if (result.isFailure) {
      res.status(400).send(result.errorValue());
      return;
    }

    res.status(200).send();
  }
}
