import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

// Modules
import { UsersModule } from 'src/users/users.module';

// Config
import { configLoader, envSchema } from './config';

// import { TypeOrmModule } from '@nestjs/typeorm';

// import { Auth } from '../../../auth/domain/entities/auth.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      load: [configLoader],
      // isGlobal: true,
      validationSchema: envSchema,
    }),
    UsersModule,

    // TypeOrmModule.forRoot({
    //   type: 'mysql',
    //   host: process.env.MYSQL_HOST,
    //   port: parseInt(process.env.MYSQL_PORT),
    //   database: process.env.MYSQL_DATABASE,
    //   username: process.env.MYSQL_USER,
    //   password: process.env.MYSQL_PASSWORD,
    //   // entities: [Auth],
    //   synchronize: true, // no en pdn
    // }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
