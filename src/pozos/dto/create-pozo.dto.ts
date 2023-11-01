import { IsBoolean, IsNotEmpty, IsObject, IsString, isBoolean } from "class-validator";
import { ObjectId } from "mongoose";

export class CreatePozoDto {
    @IsString()
    @IsNotEmpty()
    Pozoname: string;

   // @IsObject()
   @IsString()
    @IsNotEmpty()
    Users: string;

    @IsBoolean()
    isActive: boolean;
}
