import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from "../roles/user.module";
import { JwtModule } from "@nestjs/jwt";

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports:[
    UserModule,
  JwtModule.register({privateKey:'Secret',
  signOptions:{
    expiresIn:'24h'
  }})
  ]
})
export class AuthModule {}
