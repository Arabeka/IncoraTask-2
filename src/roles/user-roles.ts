import { Column, DataType, Model, Table } from "sequelize-typescript";


@Table({ tableName: "roles" })
export class UserRole extends Model<UserRole> {
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number;
  @Column({ type: DataType.INTEGER })
  roleId: number;
  @Column({ type: DataType.INTEGER })
  userId: number;
}
