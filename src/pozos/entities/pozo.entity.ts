import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { type } from 'os';
import { UserDocument } from 'src/user/user.schema';


@Schema({
    timestamps: true,
    versionKey: false,
  })
export class Pozo {
    @Prop({unique: true, required: true})
    Pozoname: string;

    @Prop({type: Types.ObjectId, ref: 'User'})
    usuario: Types.ObjectId;
}

export const PozoSchema = SchemaFactory.createForClass(Pozo);

export type PozoDocument = Pozo & Document;