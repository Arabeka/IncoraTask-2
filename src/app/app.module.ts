import { Module } from "@nestjs/common";
import { ProductModule } from "../product/product.module";
import { SequelizeModule } from "@nestjs/sequelize";
import { ProductDatabase } from "../product/Product.database";
import { User } from "../roles/user.database";
import { UserModule } from "../roles/user.module";
import { AuthModule } from "../auth/auth.module";

@Module({
  imports: [ProductModule, UserModule, AuthModule,
    SequelizeModule.forRoot({
      dialect: "postgres",
      host: "localhost",
      port: 5432,
      username: "postgres",
      password: "root",
      database: "Arabius",
      models: [ProductDatabase, User],
      autoLoadModels: true
    })
  ]
})

export class AppModule {}
