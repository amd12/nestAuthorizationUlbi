import {IsNumber, IsString, Length} from "class-validator";

export class addRoleDto{
   @IsString({message: 'It should be string'})
   readonly value: string;
   @Length(1,4,{message: "Not less than 4 and not more than 16"})
   @IsNumber({}, {message: 'Only number'})
   readonly userId: number;
}