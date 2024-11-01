import express, { type ErrorRequestHandler, type Request, type Response } from 'express';
import compression from 'compression';
import cors from 'cors';
import helmet from 'helmet';

import corsOptions from './configs/cors-options';
import router from './routes/router';
import environment from './configs/environment';
import helmetOptions from './configs/helmet-options';
import compressionOptions from './configs/compression-options';

const app = express();

// Security & performance config
app.disable('x-powered-by');
app.use(helmet(helmetOptions));
app.use(compression(compressionOptions));
app.use(cors(corsOptions));

// JSON body parser
app.use(express.json());

// Error handler
app.use((err: ErrorRequestHandler, _req: Request, res: Response) => {
  console.warn('Error: ', err);
  res.status(500).send('Internal Server Error');
});

// Main router
app.use('/api', router);

app.listen(environment.port, () => console.log(`Server available on port ${environment.port}.`));
