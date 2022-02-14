import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {User} from "./users.model";
import {InjectModel} from "@nestjs/sequelize";
import {CreateUserDto} from "./dto/create-user.dto";
import {RolesService} from "../roles/roles.service";
import {addRoleDto} from "./dto/add-role.dto";
import {BanUserDto} from "./dto/ban-user.dto";

@Injectable()
export class UsersService {

    constructor(@InjectModel(User) private userRepository: typeof User, private roleService: RolesService) {
    }

    async createUser(dto: CreateUserDto){
        const user = await  this.userRepository.create(dto)
        const role = await this.roleService.getRoleByValue("ADMIN");
         await user.$set('roles',[role.id]);
         user.roles = [role];
        return user;
    }

    async getAllUsers(){
        const users = await this.userRepository.findAll({include:{all: true}});
        return users;
    }

    async getUserByEmail(email: string){
        const user = this.userRepository.findOne({where:{email}, include:{all: true}});
        return user;
    }

    async addRole(dto: addRoleDto){
        const user = this.userRepository.findByPk(dto.userId);
        const role = this.roleService.getRoleByValue(dto.value);
            if (user && role){
                 await (await user).$add('role', (await role).id);
                 return user;
        }else {
                throw new HttpException('User is not found', HttpStatus.NOT_FOUND)
            }
    }


    async addBan(dto: BanUserDto){
          const user = this.userRepository.findByPk(dto.userId);
          if (user){
               (await user).banned = true;
               (await user).banReason = dto.banReason;
              await (await user).save();
              return user;
          }else {
              throw new HttpException('User not found', HttpStatus.NOT_FOUND);
          }
    }

    async getUserBan(){
        const user = this.userRepository.findAll({where:{banned: true},include:{all: true}});
        return user;
    }

}
