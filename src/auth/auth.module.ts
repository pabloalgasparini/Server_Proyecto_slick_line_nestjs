import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from '../user/user.module';
import { UserSchema } from '../user/user.schema'; 
import { RoleSchema } from '../roles/entities/roles.entity'; 
import { JwtModule } from '@nestjs/jwt';
import {ConfigModule, ConfigService} from "@nestjs/config"
import { JwtStrategy } from './jwt.strategy';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    PassportModule.register({defaultStrategy: 'jwt'}),
      JwtModule.registerAsync({
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: async (config: ConfigService) => ({
          secret: config.get<string>("secret"),
          signOptions: {
            expiresIn: '1d',
          },
        })
      })
    ,UserModule, MongooseModule.forFeature([
    { name: 'User', schema: UserSchema },
    { name: 'Role', schema: RoleSchema },
  ])],
  controllers: [AuthController],
  providers: [AuthService,
  JwtStrategy],
})
export class AuthModule {}
