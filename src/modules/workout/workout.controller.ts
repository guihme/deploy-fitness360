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
import { TreinoDTO } from 'src/DTO';
import { TreinoService } from './workout.service';
import { CriarTreinoProps } from 'src/entity';
import { BodyCreateTreinoOptions } from './workout.schema';

@ApiTags('treinos')
@Controller('treino')
export class TreinoController {
  constructor(private readonly treinoService: TreinoService) {}

  @ApiOperation({ summary: 'List all Treinos' })
  @Get()
  async all(@Res() res: Response) {
    const result = await this.treinoService.getAll();
    if (result.isFailure) {
      res.status(400).send(result.errorValue());
      return;
    }

    const treinos = result.getValue();
    const treinosDTO: TreinoDTO[] = [];

    for (const treino of treinos) {
      treinosDTO.push(treino.toDTO());
    }

    res.status(200).send(treinosDTO);
  }

  @ApiOperation({ summary: 'Create a treino' })
  @ApiBody(BodyCreateTreinoOptions)
  @Post()
  async create(@Body() body: CriarTreinoProps, @Res() res: Response) {
    const result = await this.treinoService.createAndSave(body);
    if (result.isFailure) {
      res.status(400).send(result.errorValue());
      return;
    }
    const treino = result.getValue();

    res.status(200).send(treino.toDTO());
  }

  @ApiOperation({ summary: 'Get a treino' })
  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response) {
    const result = await this.treinoService.findById(id);
    if (result.isFailure) {
      res.status(400).send(result.errorValue());
      return;
    }
    const treino = result.getValue();

    res.status(200).send(treino.toDTO());
  }

  @ApiOperation({ summary: 'Update a treino' })
  @ApiBody(BodyCreateTreinoOptions)
  @Put(':id')
  async update(
    @Body() data: CriarTreinoProps,
    @Param('id') id: string,
    @Res() res: Response,
  ) {
    const result = await this.treinoService.update(data, id);
    if (result.isFailure) {
      res.status(400).send(result.errorValue());
      return;
    }
    const treino = result.getValue();

    res.status(200).send(treino.toDTO());
  }

  @ApiOperation({ summary: 'Remove a treino' })
  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res: Response) {
    const result = await this.treinoService.delete(id);
    if (result.isFailure) {
      res.status(400).send(result.errorValue());
      return;
    }

    res.status(200).send();
  }
}
