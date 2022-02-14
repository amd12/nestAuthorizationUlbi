import {ApiProperty} from "@nestjs/swagger";
import {IsString} from "class-validator";

export class CreateUserDto{
    @ApiProperty({example: 'twink@gmail.com',description:'Email user'})
    readonly email:string;

    @ApiProperty({example: 'qwery123',description:'Password user'})
    readonly password:string;
}