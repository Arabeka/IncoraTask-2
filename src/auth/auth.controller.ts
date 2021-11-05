import { Body, Controller, Get, Post } from "@nestjs/common";
import { CreateRoleDto } from "../roles/dto/create-role.dto";
import { AuthService } from "./auth.service";

@Controller('auth')
export class AuthController {
  constructor(private authService:AuthService) {
  }

  @Post('/login')
  login(@Body() rolesDto:CreateRoleDto){
    return this.authService.login(rolesDto)
  }

  @Post('/registration')

  registration(@Body() rolesDto:CreateRoleDto){
    return this.authService.registration(rolesDto)
  }


}
