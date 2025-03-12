import sequelize from "../config/db.config";
import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";

class Admin extends Model<
  InferAttributes<Admin>,
  InferCreationAttributes<Admin, { omit: "id" }>
  > {
    declare id: number;
    declare username: string;
    declare email: string;
    declare password: string;
  }

Admin.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING(50),
      unique: true,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(100),
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Admin",
    tableName: "admins",
    timestamps: false,
  }
);

Admin.sync();

export default Admin;
