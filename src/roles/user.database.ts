import { Column, DataType, Model, Table } from "sequelize-typescript";
import { IUser } from "../interfaces/user.interfaces";

@Table({ tableName: "user" })
export class User extends Model<User, IUser> {
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number;
  @Column({ type: DataType.STRING, allowNull: true })
  name: string;
  @Column({ type: DataType.STRING, allowNull: false, unique: false })
  email: string;
  @Column({ type: DataType.STRING, allowNull: false })
  role: string;
  @Column({ type: DataType.STRING, allowNull: false })
  password: string;
}
