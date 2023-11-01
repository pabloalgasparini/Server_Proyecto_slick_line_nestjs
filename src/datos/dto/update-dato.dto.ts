import { PartialType } from '@nestjs/mapped-types';
import { CreateDatoDto } from './create-dato.dto';
import { IsNotEmpty, IsNumber, IsObject, IsTimeZone } from 'class-validator';
import { ObjectId } from 'mongoose';

export class UpdateDatoDto extends PartialType(CreateDatoDto) {
    @IsNotEmpty()
    Time?: number

    @IsNotEmpty()
    @IsNumber()
    Pressure?: number

    @IsNotEmpty()
    @IsNumber()
    Temperature?: number

    @IsNotEmpty()
    @IsNumber()
    Depth?: number

    @IsNotEmpty()
    @IsNumber()
    Dp_Dz?: number

    @IsNotEmpty()
    @IsNumber()
    Dt_Dz?: number

    @IsObject()
    Pozo?: ObjectId

    @IsObject()
    User?: ObjectId
}
