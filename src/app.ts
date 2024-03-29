import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import routes from './routes';

class App {
  public express: express.Application;

  public constructor() {
    this.express = express();

    this.middleWares();
    this.database();
    this.routes();
  }

  private middleWares(): void {
    this.express.use(express.json());
    this.express.use(cors());
  }

  private database(): void {
    mongoose
      .connect("mongodb://localhost:27017/guilder", {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true
      })
      .then(() => console.log("DB Connected!"))
      .catch((err) => {
        console.log(`DB Connection Error: ${err.message}`);
      });
  }

  private routes(): void {
    this.express.use(routes);
  }
}

export default new App().express;
