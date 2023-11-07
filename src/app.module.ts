import { Module, OnModuleInit } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { RolesService } from './roles/roles.service';
import { RolesModule } from './roles/roles.module';
import { DatosModule } from './datos/datos.module';
import { PozosModule } from './pozos/pozos.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import env from './settings/env';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [env]
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        uri: config.get<string>("mongodb_uri")
      })
    }),
    UserModule,
    AuthModule,
    RolesModule,
    DatosModule,
    PozosModule,
  ],
  controllers: [AppController],
  providers: [AppService, RolesService],
})
export class AppModule implements OnModuleInit {
  constructor(private roleService: RolesService) {}

  async onModuleInit() {
    console.log('Conectado a Mongo');
    await this.roleService.createRolesIfNotExist();
  }
}
