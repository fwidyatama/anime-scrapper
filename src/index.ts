import express, { Application, Router } from "express";
const app: Application = express();
const port = 3000;
import animeRouter from "./routes";
// Body parsing Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", animeRouter);
try {
  app.listen(port, (): void => {
    console.log(`Connected successfully on port ${port}`);
  });
} catch (error) {
  console.error(`Error occured: ${error.message}`);
}
