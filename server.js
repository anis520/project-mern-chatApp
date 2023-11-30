import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import AuthRoutes from "./routes/AuthRoutes.js";
import cookieParser from "cookie-parser";
import mongoDBConnect from "./config/database.js";
import cors from "cors";
import { handleError } from "./utils/handleError.js";
import { v2 as cloudinary } from "cloudinary";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url + "/api/pubic"));

cloudinary.config({
  cloud_name: "dgbhheqgy",
  api_key: "146156465818285",
  api_secret: "vfQ0XsOQcVAVP0pSgwAHOWgeU_E",
});

dotenv.config();

const app = express();

// socket connection

//

// set middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    optionsSuccessStatus: 200,
  })
);

// environment vars
const PORT = process.env.PORT || 5050;

// set static

app.use(express.static("api/pubic"));
// console.log(path.join(__dirname,'api/pubic'))
app.use(cookieParser());
app.use("/api/v1", AuthRoutes);

app.use(handleError);
app.listen(PORT, () => {
  console.log(`server was running on port ${PORT}`.bgBlue);
  mongoDBConnect();
});
