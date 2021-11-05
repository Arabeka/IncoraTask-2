import { Column, DataType, Length, Model, Table } from "sequelize-typescript";

interface RoleAttrs{
  email:string,
  role:string,
  password:string;
}


@Table({tableName:'user'})
export class Role extends Model<Role,RoleAttrs>{
  @Column({type:DataType.INTEGER,unique:true,autoIncrement:true,primaryKey:true})
  id:number;
  @Column({type:DataType.STRING,allowNull:true})
  name:string;
  @Column({type:DataType.STRING,allowNull:false,unique:false})
  email:string;
  @Column({type:DataType.STRING,allowNull:false})
  role:string;
  @Column({type:DataType.STRING,allowNull:false})
  password:string;
}
