import express, { type ErrorRequestHandler, type Request, type Response } from 'express';
import compression from 'compression';
import cors from 'cors';
import helmet from 'helmet';

import corsOptions from '@/configs/cors-options';
import router from '@/routes/rooter';

const app = express();

// Security & performance config
app.disable('x-powered-by');
app.use(helmet());
app.use(compression());
app.use(cors(corsOptions));

// JSON body parser
app.use(express.json());

// Error handler
app.use((err: ErrorRequestHandler, _req: Request, res: Response) => {
  console.log('Error: ', err);
  res.status(500).send('Internal Server Error');
});

// Main router
app.use('/api', router);

app.listen(process.env.PORT, () => console.log(`Server available on port ${process.env.PORT}.`));
