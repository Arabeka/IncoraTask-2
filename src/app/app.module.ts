import { Module } from '@nestjs/common';
import { ProductModule } from "../product/product.module";
import { ConfigModule } from "@nestjs/config";
import { SequelizeModule } from "@nestjs/sequelize";
import { ProductDatabase } from "../product/Product.database";
import { Role } from "../roles/roles.database";
import { UserRole } from "../roles/user-roles";
import { UserModule } from "../roles/user.module";
import { AuthModule } from "../auth/auth.module";

@Module({
  imports: [ProductModule,UserModule,AuthModule,
  SequelizeModule.forRoot({
    dialect: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'root',
    database: 'Arabius',
    models: [ProductDatabase,Role],
    autoLoadModels:true,
  }),
]

})
export class AppModule {

}
