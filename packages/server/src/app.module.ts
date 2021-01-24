import path from 'path';
import mongoose from 'mongoose';
import { Module, DynamicModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { MongooseSerializerInterceptor } from '@/utils/mongoose';
import Joi from '@hapi/joi';

interface Configs {
  MONGODB_URI?: string;
}

const envFilePath = [
  `.env.${process.env.NODE_ENV || 'development'}.local`,
  `.env.${process.env.NODE_ENV || 'development'}`,
  '.env.local',
  '.env'
].map(pathname => path.resolve(process.cwd(), pathname));

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath,
      validationSchema: Joi.object({
        NODE_ENV: Joi.string()
          .valid('development', 'production', 'test')
          .default('development'),
        MONGODB_URI: Joi.string().optional()
      })
    })
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: MongooseSerializerInterceptor
    }
  ]
})
export class AppModule {
  static init({ MONGODB_URI }: Configs = {}): DynamicModule {
    return {
      module: AppModule,
      imports: [
        MongooseModule.forRootAsync({
          imports: [ConfigModule],
          inject: [ConfigService],
          useFactory: async (configService: ConfigService) => {
            mongoose.set('toJSON', {
              virtuals: true, // clone '_id' to 'id'
              versionKey: false // remove '__v',
            });

            return {
              uri: MONGODB_URI || configService.get<string>('MONGODB_URI'),
              useNewUrlParser: true,
              useFindAndModify: false,
              useCreateIndex: true,
              useUnifiedTopology: true
            };
          }
        })
      ]
    };
  }
}
