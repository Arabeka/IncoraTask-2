import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
  Req
} from "@nestjs/common";
import { CreateProductsDto, QueryParamsDto } from "./dto/products.dto";
import { ProductsService } from "./products.service";
import {Request} from "express";

@Controller('api/products')
export class ProductsController {
  constructor(private productsService: ProductsService,) {}


  @Post()
  create(
    @Body() productsDto: CreateProductsDto,
    @Param ('code')  code:string
  ) {
    return this.productsService.createProduct(productsDto,code);
  }

  @Get()
  getAll(
    @Query() reqParam:QueryParamsDto,
  ){
   const value:any= this.productsService.getAllProducts(reqParam.offset,reqParam.limit,reqParam.sort_by,reqParam.sort_type,reqParam.s)

      return value
  }


  @Get(':id')
  getId(
    @Param('id',ParseIntPipe)id:number,
  ){

    return this.productsService.getProductById(id)
  }

  @Delete(':id')
  deleteById(
    @Param('id',ParseIntPipe)id:number){
    return this.productsService.deleteProductById(id)
  }

  @Put(':id')
  updateById(
    @Param('id',ParseIntPipe) id:number,
    @Body()body){
    return this.productsService.updateProductById(body,id)
  }
}