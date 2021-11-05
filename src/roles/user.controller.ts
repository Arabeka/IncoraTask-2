import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { RolesService } from "./roles.service";
import { CreateRoleDto } from "./dto/create-role.dto";

@Controller('api/roles')
export class UserController {
  constructor(private rolesService:RolesService) {
  }

  @Post()
  create(
    @Body() dto:CreateRoleDto){
    return this.rolesService.createRole(dto)
  }

  @Get('/:role')
  getByRole(
    @Param('role') role:string){
   return this.rolesService.getUserByValue(role)
  }

}
