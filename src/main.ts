import express from 'express';
import compression from 'compression';
import cors from 'cors';
import helmet from 'helmet';

import corsOptions from './configs/cors-options';
import router from './routes/router';
import environment from './configs/environment';
import compressionOptions from './configs/compression-options';

const app = express();

// Security & performance config
app.disable('x-powered-by');
app.use(helmet());
app.use(compression(compressionOptions));
app.use(cors(corsOptions));

// JSON body parser
app.use(express.json());

// Main router
app.use('/api', router);

app.listen(environment.port, () => console.log(`Server available on port ${environment.port}.`));
