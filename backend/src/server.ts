import express, { NextFunction, Request, Response } from "express";
import routes from "./routes";
import cors from "cors";

const app = express();

const port = process.env.PORT ?? 8080;

app.use(cors());
app.use(express.json());

app.use("/", routes);

app.use((_req, _res, next) => {
  const err = new Error("Not Found Route");
  next(err);
});

app.use((error: any, _req: Request, res: Response, _next: NextFunction) => {
  res.status(error.status || 500);
  return res.send({
    error: error.message,
  });
});

app.listen(port, () => {
  console.log(`Running at port ${port}`);
});
