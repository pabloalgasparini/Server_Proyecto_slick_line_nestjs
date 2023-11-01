import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { UserDocument } from 'src/user/user.schema';
import { PozoDocument } from 'src/pozos/entities/pozo.entity';


@Schema({
    timestamps: true,
    versionKey: false,
  })

export class Datos {
    @Prop({unique: true, required: true})
    Time: number

    @Prop({unique: true, required: true})
    Pressure: number

    @Prop({unique: true, required: true})
    Temperature: number

    @Prop({unique: true, required: true})
    Depth: number

    @Prop({unique: true, required: true})
    Dp_Dz: number

    @Prop({unique: true, required: true})
    Dt_Dz: number

    @Prop({unique: true, required: true})
    Description: string

    @Prop([{ type: [{type: 'ObjectId', ref: 'Pozo'}] }])
    Pozo: PozoDocument[]; 

    @Prop([{ type: Types.ObjectId, ref: 'User' }])
    User: UserDocument[]; 
}

export const DatosSchema = SchemaFactory.createForClass(Datos);

export type DatosDocument = Datos & Document;