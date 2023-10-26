import { IsNotEmpty, IsObject, IsString } from "class-validator";
import { ObjectId } from "mongoose";

export class CreatePozoDto {
    @IsString()
    @IsNotEmpty()
    Pozoname: string;

   // @IsObject()
   @IsString()
    @IsNotEmpty()
    User: string;
}
