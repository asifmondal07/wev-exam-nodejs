import "dotenv/config";

export default {
  port: process.env.PORT,
  mongoUrl: process.env.MONGODB_URI,
  jwtSecret: process.env.JWT_SECRET
};
