import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import AuthRoutes from "./routes/AuthRoutes.js";
import ChatRoutes from "./routes/ChatRoutes.js";
import cookieParser from "cookie-parser";
import mongoDBConnect from "./config/database.js";
import cors from "cors";
import { handleError } from "./utils/handleError.js";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url + "/api/pubic"));

const app = express();

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
app.use("/api/v1", ChatRoutes);

app.use(handleError);
app.listen(PORT, () => {
  console.log(`server was running on port ${PORT}`.bgBlue);
  mongoDBConnect();
});
