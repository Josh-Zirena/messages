import express from "express";
import cookieParser from "cookie-parser";
import logger from "morgan";
import apiDoc from "./api-doc";
import { initialize } from "express-openapi";

var swaggerUi = require("swagger-ui-express");

const app = express();
const port = 8008

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// OpenAPI routes
initialize({
    app,
    apiDoc: apiDoc,
    paths: "./api/paths",
  });

// OpenAPI UI
app.use(
    "/api-documentation",
    swaggerUi.serve,
    swaggerUi.setup(null, {
      swaggerOptions: {
        url: "http://localhost:8008/api-docs",
      },
    })
  );

app.get('/', (req, res) => {
    res.send("pong");
})

app.get('/stream', (req, res) => {
    res.status(200).json({message: "Okay!"})
})

app.listen(port, () => {
    console.log(`Example app listening on ${port}`)
})

export default app;