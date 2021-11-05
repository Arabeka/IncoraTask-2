import { HttpException, HttpStatus, Injectable, Req } from "@nestjs/common";
import { ProductDatabase } from "./Product.database";
import { InjectModel } from "@nestjs/sequelize";
import { CreateProductsDto } from "./dto/products.dto";
import {v4 as uuid } from "uuid"
import {sortOrder} from "../helper/enum"
import sequelize, { Op, Sequelize, where } from "sequelize";
import { async } from "rxjs";
import { HasOne } from "sequelize-typescript";

@Injectable()

export class ProductsService {
  constructor(@InjectModel(ProductDatabase) private productRepository: typeof ProductDatabase) {
  }

  async createProduct(dto: CreateProductsDto, code) {
    const product = await this.productRepository.create(dto)

    if (!code) {
      code = uuid()
      product.code = code;
    }
    return product;
  }


  async getAllProducts(offset, limit, sortBy, sortType = 'asc', s) {

    const products = await this.productRepository.findAll();
    const amount = await this.productRepository.count();

    if (sortBy)
      products.sort((a, b) => {
        if (a[`${sortBy}`] > b[`${sortBy}`]) return sortOrder[`${sortType}`];
        else if (a[`${sortBy}`] < b[`${sortBy}`]) return -sortOrder[`${sortType}`];
        else return 0
      })

    if (s) {
        return  products.filter(item=>`${item.title} ${item.price} ${item.id} ${item.code} ${item.description} ${item.tax} ${item.discount}`.toLowerCase().includes(s));

    }
    if (offset && limit) {
      const query = await this.productRepository.findAll({offset:offset*limit,limit:limit})
      return {
        amount,
        query
      }
    }
    return products;
  }


  async getProductById(id: number) {
    const product = await this.productRepository.findByPk(id)
    if (!product || !product.quantity) {
      throw new HttpException(`Invalid value`, 400)
    }
    return product
  }


  async deleteProductById(id) {

    const product = await this.productRepository.destroy({ where: { id: id } })
    if (!product) {
      throw new HttpException(`Value doesn't exist`, 400)
    }
    throw new HttpException({
      status: 200,
      message: "Product has been successfully deleted."
    }, HttpStatus.OK)
  }


  async updateProductById(body: CreateProductsDto, id) {
    const product = await this.productRepository.update(body, { where: { id: id } })
    if (!product) {
      throw new HttpException(`Value doesn't exist`, 400)

    }
    return this.productRepository.findByPk(id)

  }
}