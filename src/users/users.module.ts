import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './entities/user.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { userConstants } from './utils';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: userConstants.TYPE_DATABASE,
        // type: 'mysql',

        host: configService.get('dbMysql.host'),
        port: configService.get('dbMysql.port'),
        database: configService.get('dbMysql.database'),
        username: configService.get('dbMysql.username'),
        password: configService.get('dbMysql.password'),
        entities: [User],
        synchronize: true,
      }),
    }),
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
