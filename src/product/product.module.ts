import { Module } from '@nestjs/common';
import { SequelizeModule } from "@nestjs/sequelize";
import { ProductDatabase } from "./Product.database";
import { ProductsController } from "./products.controller";
import { ProductsService } from "./products.service";

@Module({
  controllers:[ProductsController],
  providers:[ProductsService],
  imports:[
    SequelizeModule.forFeature([ProductDatabase])
  ],
})
export class ProductModule {}
