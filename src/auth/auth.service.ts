import * as bcrypt from "bcryptjs";
import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException
} from "@nestjs/common";
import { CreateUserDto } from "../roles/dto/create-user.dto";
import { UserService } from "../roles/user.service";
import { JwtService } from "@nestjs/jwt";
import { User } from "../roles/user.database";

@Injectable()
export class AuthService {

  constructor(
    private rolesService: UserService,
    private jwtService: JwtService
  ) {}

  async login(rolesDto: CreateUserDto) {
    const user = await this.validateUser(rolesDto);

    return this.generateToken(user);
  }

  async registration(rolesDto: CreateUserDto) {
    const candidate = await this.rolesService.getUserByEmail(rolesDto.email);
    if (candidate) {
      throw new HttpException("User with this email exists", HttpStatus.BAD_REQUEST);
    }
    const hashPassword = await bcrypt.hash(rolesDto.password, 5);
    const user = await this.rolesService.createUser({ ...rolesDto, password: hashPassword });

    return this.generateToken(user);
  }

  private async generateToken(user: User) {
    const payLoad = { email: user.email, role: user.role };

    return {
      token: this.jwtService.sign(payLoad)
    };
  }

  private async validateUser(rolesDto: CreateUserDto) {
    const user = await this.rolesService.getUserByEmail(rolesDto.email);
    const passwordEquals = await bcrypt.compare(rolesDto.password, user.password);
    if (!user && !passwordEquals) {
      throw new UnauthorizedException({ message: "Invalid email or password" });
    }
    return user;
  }
}
