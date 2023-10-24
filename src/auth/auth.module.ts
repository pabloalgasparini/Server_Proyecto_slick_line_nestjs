import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from '../user/user.module';
import { UserSchema } from '../user/user.schema'; 
import { RoleSchema } from '../roles/entities/roles.entity'; 

@Module({
  imports: [UserModule, MongooseModule.forFeature([
    { name: 'User', schema: UserSchema },
    { name: 'Role', schema: RoleSchema },
  ])],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
