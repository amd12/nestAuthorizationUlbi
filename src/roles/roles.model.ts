import {BelongsToMany, Column, DataType, Model, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import {User} from "../users/users.model";
import {UserRoles} from "./user-roles.model";

interface RolesCreationAttrs {
    value:string;
    description:string;
}

@Table({tableName: 'roles'})
export class Role extends Model<Role,RolesCreationAttrs>{

    @ApiProperty({example: '1',description:'unique identification'})
    @Column({type: DataType.INTEGER, unique:true, autoIncrement:true, primaryKey: true})
    id: number;

    @ApiProperty({example: 'ADMIN',description:'Role user'})
    @Column({type: DataType.STRING, allowNull: false})
    value: string;

    @ApiProperty({example: 'Administration',description:'Description roles'})
    @Column({type: DataType.STRING})
    description: string;

    @BelongsToMany(()=> User, ()=> UserRoles)
    users:User[];
}