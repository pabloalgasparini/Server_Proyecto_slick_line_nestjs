import { Module } from '@nestjs/common';
import { DatosService } from './datos.service';
import { DatosController } from './datos.controller';
import { UserModule } from 'src/user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/user/user.schema';
import { PozosModule } from 'src/pozos/pozos.module';
import { PozoSchema } from 'src/pozos/entities/pozo.entity';

@Module({
  imports: [UserModule,PozosModule, MongooseModule.forFeature([
    { name: 'User', schema: UserSchema },
    { name: 'Pozos', schema: PozoSchema},
  ])],
  controllers: [DatosController],
  providers: [DatosService],
})
export class DatosModule {}
