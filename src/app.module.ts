import { Module, OnModuleInit, MiddlewareConsumer, RequestMethod  } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { InjectModel, MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { RolesService } from './roles/roles.service';
import { RolesModule } from './roles/roles.module';
import { JwtModule } from '@nestjs/jwt';
import { CheckDuplicateUsernameOrEmailMiddleware} from './middlewares/middlewares.middleware'
import { User, UserDocument } from './user/user.schema';
import { Model } from 'mongoose';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/refsadb'),
    UserModule,
    AuthModule,
    RolesModule,
    JwtModule.register({
      secret: 'fernet',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AppController],
  providers: [AppService, RolesService],
})
export class AppModule implements OnModuleInit {
  constructor(private roleService: RolesService) {}

  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CheckDuplicateUsernameOrEmailMiddleware)
      .forRoutes({ path: 'auth/signup', method: RequestMethod.POST });
  }

  async onModuleInit() {
    console.log('Conectado a Mongo');
    await this.roleService.createRolesIfNotExist();
  }
}
