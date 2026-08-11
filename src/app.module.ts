import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';
import { TodoModule } from './todo/todo.module';
import { Todo } from './todo/entities/todo.entity';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

function buildTypeOrmOptions(config) {
  return {
    type: 'mysql',
    host: config.get('DB_HOST', 'db'),
    port: config.get('DB_PORT', 3306),
    username: config.get('DB_USERNAME', 'root'),
    password: config.get('DB_PASSWORD'),
    database: config.get('DB_DATABASE', 'notes'),
    entities: [
      User,
      Todo,
    ],
    synchronize: true,
  };
}

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: buildTypeOrmOptions,
    }),
    UsersModule,
    TodoModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
