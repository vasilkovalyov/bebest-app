import express, { Request, Response, Express } from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import dotenv from 'dotenv';
import fileUpload from 'express-fileupload';

import databaseConnect from './database';

import studentRoute from './routes/student.routes';
import teacherRoute from './routes/teacher.routes';
import companyRoute from './routes/company.routes';
import authRoute from './routes/auth.routes';
import subjectRoute from './routes/subject.routes';

(async () => {
  const server: Express = express();
  const PORT = process.env.PORT || 4000;
  dotenv.config();

  server.use(bodyParser.json({ limit: '50mb' }));
  server.use(cors({ credentials: true, origin: process.env.API_URL }));
  server.use(express.urlencoded({ extended: true }));
  server.use(compression());
  server.use(cookieParser());
  server.use(express.json());
  server.use(
    fileUpload({
      useTempFiles: true,
      limits: { fileSize: 50 * 1024 * 1024 },
    })
  );

  server.use('/api', authRoute);
  server.use('/api', studentRoute);
  server.use('/api', teacherRoute);
  server.use('/api', companyRoute);
  server.use('/api', subjectRoute);

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
