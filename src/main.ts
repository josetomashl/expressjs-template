import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { json, urlencoded } from 'express';
import helmet from 'helmet';

import { compressionOptions } from './configs/compression-options';
import { corsOptions } from './configs/cors-options';
import { environment } from './configs/environment';
import { urlencodedOptions } from './configs/urlencoded-options';
import { router } from './routes/router';

const app = express();

// Security & performance config
app.disable('x-powered-by');
app.use(helmet());
app.use(compression(compressionOptions));
app.use(cors(corsOptions));

// parsers
app.use(json());
app.use(urlencoded(urlencodedOptions));
app.use(cookieParser());

// Main router
app.use('/api', router);

app.listen(environment.PORT, () => console.log(`Server available on port ${environment.PORT}.`));
