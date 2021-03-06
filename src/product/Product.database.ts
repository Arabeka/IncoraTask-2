import { Column, DataType, Model, Table } from "sequelize-typescript";
import { IProduct } from "../interfaces/products.interfaces"

@Table({ tableName: "product", updatedAt: false })
export class ProductDatabase extends Model<ProductDatabase, IProduct> {
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  title: string;

  @Column({ type: DataType.FLOAT, allowNull: false })
  price: number;

  @Column({ type: DataType.INTEGER, allowNull: false })
  quantity: number;

  @Column({ type: DataType.TEXT, defaultValue: "", allowNull: true })
  description: string;

  @Column({ type: DataType.FLOAT, allowNull: false })
  tax: number;

  @Column({ type: DataType.INTEGER, validate: { min: 0, max: 100 }, allowNull: true, defaultValue: 0 })
  discount: number;

  @Column({ type: DataType.TEXT, allowNull: true, unique: false })
  code: string;
}
