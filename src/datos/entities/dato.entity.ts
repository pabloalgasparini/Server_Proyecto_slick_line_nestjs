import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { UserDocument } from 'src/user/user.schema';
import { PozoDocument } from 'src/pozos/entities/pozo.entity';


@Schema({
    timestamps: true,
    versionKey: false,
  })

export class Datos {
    @Prop({required: true})
    Time: number

    @Prop({required: true})
    Pressure: number

    @Prop({ required: true})
    Temperature: number

    @Prop({ required: true})
    Depth: number

    @Prop({ required: true})
    DpDz: number

    @Prop({ required: true})
    DtDz: number

    @Prop({ required: true})
    Description: string

    @Prop({ required: true})
    Density: number

    @Prop([{ type: [{type: 'ObjectId', ref: 'Pozo'}] }])
    Pozo: PozoDocument[]; 

    @Prop([{ type: Types.ObjectId, ref: 'User' }])
    User: UserDocument[]; 
}

export const DatosSchema = SchemaFactory.createForClass(Datos);

export type DatosDocument = Datos & Document;