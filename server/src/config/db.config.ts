import mysql from "mysql2/promise";
import dotenv from "dotenv";
import { Sequelize } from "sequelize";

dotenv.config();

const sequelize = new Sequelize({
  dialect: "mysql",
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT as string),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

export const dbConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

export const disconnectDB = async () => {
  try {
    await sequelize.close();
    console.log("Connection has been closed successfully.");
  } catch (error) {
    console.error("Error closing the database connection:", error);
  }
};

export default sequelize;