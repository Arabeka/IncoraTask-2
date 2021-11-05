import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { InjectModel } from "@nestjs/sequelize";
import { User } from "./user.database";

@Injectable()
export class UserService {

  constructor(@InjectModel(User) private roleRepository: typeof User) {
  }

  async createUser(dto: CreateUserDto) {
    const user = await this.roleRepository.create(dto);
    return user;
  }

  async getUserByValue(role: string) {
    const roles = await this.roleRepository.findAll({ where: { role } });
    return roles;
  }

  async getUserByEmail(email: string) {
    const user = await this.roleRepository.findOne({ where: { email }, include: { all: true } });
    return user;
  }
}
