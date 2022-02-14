import {ApiProperty} from "@nestjs/swagger";
import {IsEmail, IsString, Length} from "class-validator";

export class CreateUserDto{
    @ApiProperty({example: 'twink@gmail.com',description:'Email user'})
    @IsString({message: 'It should be string'})
    @IsEmail({},{message: 'Incorrect email'})
    readonly email:string;
    @IsString({message: 'It should be string'})
    @Length(4,15,{message: "Not less than 4 and not more than 16"})
    @ApiProperty({example: 'qwery123',description:'Password user'})
    readonly password:string;
}