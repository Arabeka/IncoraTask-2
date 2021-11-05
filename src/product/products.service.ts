import { v4 as uuid } from "uuid";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { ProductDatabase } from "./Product.database";
import { InjectModel } from "@nestjs/sequelize";
import { CreateProductsDto } from "./dto/products.dto";
import { sortOrder } from "../helper/enum";

@Injectable()
export class ProductsService {
  constructor(@InjectModel(ProductDatabase) private productRepository: typeof ProductDatabase) {
  }

  async createProduct(dto: CreateProductsDto, code) {
    const product = await this.productRepository.create(dto);

    if (!code) {
      code = uuid();
      product.code = code;
    }
    return product;
  }

  async getAllProducts(offset, limit, sortBy, sortType = "asc", s) {
    const products = await this.productRepository.findAll();
    const amount = await this.productRepository.count();

    if (sortBy)
      products.sort((a, b) => {
        if (a[`${sortBy}`] > b[`${sortBy}`]) return sortOrder[`${sortType}`];
        else if (a[`${sortBy}`] < b[`${sortBy}`]) return -sortOrder[`${sortType}`];
        else return 0;
      });

    if (s) {
      return products.filter((product) => Object.entries(product).filter(([key, value]) => value === s).length);
    }

    if (offset && limit) {
      const query = await this.productRepository.findAll({ offset: offset * limit, limit: limit });
      return {
        amount,
        query
      };
    }
    return products;
  }

  async getProductById(id: number) {
    try {
      return await this.productRepository.findByPk(id);
    } catch (e) {
      throw new HttpException(`Invalid value`, 400);
    }
  }

  async deleteProductById(id) {
    try {
      await this.productRepository.destroy({ where: { id: id } });
    } catch (e) {
      throw new HttpException(`Value doesn't exist`, 400);
    }
  }

  async updateProductById(body: CreateProductsDto, id) {
    try {
      return await this.productRepository.update(body, { where: { id: id } });
    } catch (e) {
      throw new HttpException(`Value doesn't exist`, 400);
    }
  }
}
