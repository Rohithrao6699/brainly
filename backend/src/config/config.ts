import dotenv from "dotenv";

dotenv.config();

interface Config {
  port: number;
  mongo_uri: string;
  jwt_secret: string;
}

const config: Config = {
  port: process.env.PORT,
  mongo_uri: process.env.MONGO_URI,
  jwt_secret: process.env.JWT_SECRET,
};

export default config;
