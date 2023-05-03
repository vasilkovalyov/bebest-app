import express, { Request, Response, Express } from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import dotenv from 'dotenv';

import databaseConnect from './database';

const server: Express = express();
const PORT = process.env.PORT || 3000;
dotenv.config();

server.use(
  cors({
    credentials: true,
  })
);

server.use(compression());
server.use(cookieParser());
server.use(bodyParser.json());

(async () => {
  try {
    databaseConnect()
      .then((response) => {
        server.listen(PORT, () =>
          console.log(`Example app listening on port ${PORT}`)
        );
      })
      .catch((e) => console.log(e));
  } catch (e) {
    process.exit(1);
  }
})();
