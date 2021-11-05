import {
  Body,
  Controller,
  Post
} from "@nestjs/common";
import { CreateUserDto } from "../roles/dto/create-user.dto";
import { AuthService } from "./auth.service";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {
  }

  @Post("/login")
  login(@Body() rolesDto: CreateUserDto) {
    return this.authService.login(rolesDto);
  }

  @Post("/registration")
  registration(@Body() rolesDto: CreateUserDto) {
    return this.authService.registration(rolesDto);
  }
}
