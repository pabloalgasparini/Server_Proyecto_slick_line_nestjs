// pozos.module.ts
import { Module } from '@nestjs/common';
import { PozosService } from './pozos.service';
import { PozosController } from './pozos.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/user/user.schema';
import { PozoSchema} from './entities/pozo.entity'

@Module({
  imports: [MongooseModule.forFeature([
    { name: 'User', schema: UserSchema },
    { name: 'Pozo', schema: PozoSchema }
  ])],
  controllers: [PozosController],
  providers: [PozosService],
})
export class PozosModule {}
