import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './user.schema';
import { RoleSchema } from 'src/roles/entities/roles.entity';

@Module({
  imports: [UserModule, MongooseModule.forFeature([
    { name: 'User', schema: UserSchema },
    { name: 'Role', schema: RoleSchema },
  ])],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService], // Asegúrate de exportar el UserService
})
export class UserModule {}
