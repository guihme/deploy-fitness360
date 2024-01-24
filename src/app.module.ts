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
      host: process.env['DB_HOST'],
      port: process.env['DB_PORT'],
      username: process.env['DB_USER'],
      password: process.env['DB_PASSWORD'],
      database: process.env['DB_NAME'],
      synchronize: true,
      entities: [__dirname + '/**/entity/**/*{.js,.ts}'],
    }),
    RepositoryModule,
    controllerModule,
  ],
})
export class AppModule {}
