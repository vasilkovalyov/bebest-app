import express, { Request, Response, Express } from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import dotenv from 'dotenv';

import databaseConnect from './database';

import studentRoute from './routes/student.routes';
import authRoute from './routes/auth.routes';

(async () => {
  const server: Express = express();
  const PORT = process.env.PORT || 3000;
  dotenv.config();

  server.use(bodyParser.json());
  server.use(cors({ credentials: true, origin: process.env.API_URL }));
  server.use(express.urlencoded({ extended: true }));
  server.use(compression());
  server.use(cookieParser());
  server.use(express.json());

  server.use('/api', authRoute);
  server.use('/api', studentRoute);

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
