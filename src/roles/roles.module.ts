import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RolesService } from './roles.service';
import { Role, RoleSchema } from './entities/roles.entity';
import { RolesController } from './roles.controller';


@Module({
  imports: [
    MongooseModule.forFeature([{ name: Role.name, schema: RoleSchema }]),
  ],
  providers: [RolesService],
  controllers: [RolesController],
  exports: [MongooseModule]
})
export class RolesModule {}
