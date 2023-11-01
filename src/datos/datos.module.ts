import { Module } from '@nestjs/common';
import { DatosService } from './datos.service';
import { DatosController } from './datos.controller';
import { UserModule } from 'src/user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/user/user.schema';
import { PozosModule } from 'src/pozos/pozos.module';
import { PozoSchema } from 'src/pozos/entities/pozo.entity';
import { DatosSchema } from './entities/dato.entity';

@Module({
  imports: [MongooseModule.forFeature([
    { name: 'Datos', schema: DatosSchema },
    { name: 'User', schema: UserSchema },
    { name: 'Pozo', schema: PozoSchema}
  ])],
  controllers: [DatosController],
  providers: [DatosService],
})
export class DatosModule {}
