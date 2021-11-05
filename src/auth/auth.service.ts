import { HttpException, HttpStatus, Injectable, UnauthorizedException } from "@nestjs/common";
import {  CreateRoleDto } from "../roles/dto/create-role.dto";
import { RolesService } from "../roles/roles.service";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from 'bcryptjs'
import { Role } from "../roles/roles.database";
@Injectable()
export class AuthService {

  constructor(private rolesService:RolesService,
              private jwtService:JwtService) {
  }

 async login( rolesDto:CreateRoleDto){
    const user= await this.validateUser(rolesDto)
    return this.generateToken(user)
  }


 async registration( rolesDto:CreateRoleDto){
      const  candidate=await this.rolesService.getUserByEmail(rolesDto.email)
      if(candidate){
        throw new HttpException('User with this email exists',HttpStatus.BAD_REQUEST)
      }
      const hashPassword=await bcrypt.hash(rolesDto.password,5)
   const user=await this.rolesService.createRole({...rolesDto,password:hashPassword})
    return this.generateToken(user)
  }

  private async generateToken(user:Role){
    const payLoad={email:user.email,role:user.role}
    return{
      token:this.jwtService.sign(payLoad)
    }
  }

  private async validateUser(rolesDto:CreateRoleDto){
    const user=await this.rolesService.getUserByEmail(rolesDto.email)
    const passwordEquals=await bcrypt.compare(rolesDto.password,user.password)
    if(user&&passwordEquals){
      return user
    }
    throw new UnauthorizedException({message:"Invalid email or password"})
  }
}
