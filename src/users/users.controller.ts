import {Body, Controller, Get, Post, UseGuards} from '@nestjs/common';
import {CreateUserDto} from "./dto/create-user.dto";
import {UsersService} from "./users.service";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import { User } from './users.model';
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {Roles} from "../auth/roles-auth.decorator";
import {RolesGuard} from "../auth/roles.guard";
import {addRoleDto} from "./dto/add-role.dto";
import {BanUserDto} from "./dto/ban-user.dto";

@ApiTags('Users')
@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService) {
    }

    @ApiOperation({summary: 'Create user'})
    @ApiResponse({status:200, type: User})
    @Post()
    create(@Body() userDto: CreateUserDto){
        return this.usersService.createUser(userDto);
    }

    @ApiOperation({summary: 'Get all users'})
    @ApiResponse({status:200, type: [User]})
    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @UseGuards(JwtAuthGuard)
    @Get()
    getAllUsers(){
        return this.usersService.getAllUsers();
    }

    @ApiOperation({summary: 'Give role'})
    @ApiResponse({status:200})
    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    //@UseGuards(JwtAuthGuard)
    @Post('/role')
    addRole(@Body() dto: addRoleDto){
        return this.usersService.addRole(dto);
    }

    @ApiOperation({summary: 'Add banned'})
    @ApiResponse({status:200})
    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Post('/ban')
    addBanned(@Body() dto: BanUserDto){
        return this.usersService.addBan(dto);
    }

    @ApiOperation({summary: 'Add banned'})
    @ApiResponse({status:200})
    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Post('/banned-users')
    getBannedUsers(){
        return this.usersService.getUserBan();
    }
}
