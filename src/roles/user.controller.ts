import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";

@Controller("api/roles")
export class UserController {
  constructor(private rolesService: UserService) {
  }

  @Post()
  create(
    @Body() dto: CreateUserDto) {
    return this.rolesService.createUser(dto);
  }

  @Get("/:role")
  getByRole(
    @Param("role") role: string) {
    return this.rolesService.getUserByValue(role);
  }

}
