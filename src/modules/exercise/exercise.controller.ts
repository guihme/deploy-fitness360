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
import { CriarExercicioProps } from 'src/entity';
import { ExercicioService } from './exercise.service';
import { ExercicioDTO } from 'src/DTO';
import { BodyCreateExerciseOptions } from './exercise.schema';

@ApiTags('exercicios')
@Controller('exercicios')
export class ExercicioController {
  constructor(private readonly exercicioService: ExercicioService) {}

  @ApiOperation({ summary: 'List all Exercicios' })
  @Get()
  async all(@Res() res: Response) {
    const result = await this.exercicioService.getAll();
    if (result.isFailure) {
      res.status(400).send(result.errorValue());
      return;
    }

    const exercicios = result.getValue();
    const exerciciosDTO: ExercicioDTO[] = [];

    for (const exercicio of exercicios) {
      exerciciosDTO.push(exercicio.toDTO());
    }

    res.status(200).send(exerciciosDTO);
  }

  @ApiOperation({ summary: 'Create an exercicio' })
  @ApiBody(BodyCreateExerciseOptions)
  @Post()
  async create(@Body() body: CriarExercicioProps, @Res() res: Response) {
    const result = await this.exercicioService.createAndSave(body);
    if (result.isFailure) {
      res.status(400).send(result.errorValue());
      return;
    }
    const exercicio = result.getValue();

    res.status(200).send(exercicio.toDTO());
  }

  @ApiOperation({ summary: 'Get an Exercicio' })
  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response) {
    const result = await this.exercicioService.findById(id);
    if (result.isFailure) {
      res.status(400).send(result.errorValue());
      return;
    }
    const exercicio = result.getValue();

    res.status(200).send(exercicio.toDTO());
  }

  @ApiOperation({ summary: 'Update an Exercicio' })
  @ApiBody(BodyCreateExerciseOptions)
  @Put(':id')
  async update(
    @Body() data: CriarExercicioProps,
    @Param('id') id: string,
    @Res() res: Response,
  ) {
    const result = await this.exercicioService.update(data, id);
    if (result.isFailure) {
      res.status(400).send(result.errorValue());
      return;
    }
    const exercicio = result.getValue();

    res.status(200).send(exercicio.toDTO());
  }

  @ApiOperation({ summary: 'Remove an exercicio' })
  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res: Response) {
    const result = await this.exercicioService.delete(id);
    if (result.isFailure) {
      res.status(400).send(result.errorValue());
      return;
    }

    res.status(200).send();
  }
}
