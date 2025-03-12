import { Json } from "sequelize/types/utils";
import sequelize from "../config/db.config";
import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";

class Project extends Model<
  InferAttributes<Project>,
  InferCreationAttributes<Project, { omit: "id" }>
  > {
    declare id: number;
    declare slug: string
    declare data: Json;
  }

Project.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    slug: {
      type: DataTypes.STRING(100),
      unique: true,
      allowNull: false,
    },
    data: {
      type: DataTypes.JSON,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Project",
    tableName: "projects",
    timestamps: true,
  }
);

Project.sync();

export default Project;
