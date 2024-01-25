import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RepositoryModule } from './repository/repository.module';
import { controllerModule } from './modules/controller.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: process.env['DB_TYPE'],
      url: process.env['DATABASE_URL'],
      synchronize: true,
      entities: [__dirname + '/**/entity/**/*{.js,.ts}'],
      ssl: {
        rejectUnauthorized: false, // Defina como true em produção para rejeitar certificados não confiáveis
      },
    }),
    RepositoryModule,
    controllerModule,
  ],
})
export class AppModule {}
