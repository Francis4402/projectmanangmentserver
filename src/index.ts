import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import router from "./app/routes";
import cookieParser from 'cookie-parser';



dotenv.config();
const app = express();

app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(cookieParser());

app.use(cors({ origin: ['*'], credentials: true }));
app.use(express.json());

app.use('/api', router);

app.get("/", (_req: Request, res: Response) => {
  res.send("This is home route");
});

const port = Number(process.env.PORT) || 5000;

app.listen(port, "0.0.0.0", () => {
  console.log(`Server running on part ${port}`);
});