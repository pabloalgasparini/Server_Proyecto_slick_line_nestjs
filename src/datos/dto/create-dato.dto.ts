import { ObjectId } from "mongoose";
import { IsNotEmpty, IsObject, IsTimeZone, IsNumber } from 'class-validator';
import { isFloat32Array } from "util/types";

export class CreateDatoDto {
    @IsNotEmpty()
    @IsTimeZone()
    Time: number

    @IsNotEmpty()
    @IsNumber()
    Pressure: number

    @IsNotEmpty()
    @IsNumber()
    Temperature: number

    @IsNotEmpty()
    @IsNumber()
    Depth: number

    @IsNotEmpty()
    @IsNumber()
    Dp_Dz: number

    @IsNotEmpty()
    @IsNumber()
    Dt_Dz: number

    @IsObject()
    Pozo: ObjectId

    @IsObject()
    User: ObjectId
}
