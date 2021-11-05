import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from "./dto/create-role.dto";
import { InjectModel } from "@nestjs/sequelize";
import { Role } from "./roles.database";
import { where } from "sequelize";

@Injectable()
export class RolesService {

  constructor(@InjectModel(Role) private roleRepository:typeof Role,) {
  }
  async createRole(dto:CreateRoleDto){
      const user=await this.roleRepository.create(dto)
      return user
  }

  async getUserByValue(role:string){
      const roles=await this.roleRepository.findAll({where:{role}})
      return roles
      }

      async getUserByEmail(email:string){
        const user=await this.roleRepository.findOne({where:{email},include:{all:true}})
        return user
        }
      }


