import { Module } from '@nestjs/common';
import { RolesService } from "./roles.service";
import { UserController } from './user.controller';
import { SequelizeModule } from "@nestjs/sequelize";
import { Role } from "./roles.database";
import { UserRole } from "./user-roles";

@Module({
  providers: [RolesService],
  controllers: [UserController],
  imports:[
    SequelizeModule.forFeature([Role,UserRole])
  ],
  exports:[RolesService]
})
export class UserModule {}
