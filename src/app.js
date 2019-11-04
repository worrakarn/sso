import "@babel/polyfill";
import express from 'express';
import appRoot from 'app-root-path';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import helmet from 'helmet';
import Container from './config/provider.service';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import Error from './config/error';

import Indexs from './routes/indexs';

const app = express();
const swaggerDocument = YAML.load(`${appRoot}/src/public/swagger.yaml`);

app.use(helmet())
if ((process.env.NODE_ENV || '').trim() !== 'production') app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.set('context', Container)
app.use('/1.0.0/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/1.0.0', Indexs);

app.use(Error);

export default app;
