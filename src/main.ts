import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { json, urlencoded } from 'express';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';

import { compressionOptions } from './configs/compression-options';
import { corsOptions } from './configs/cors-options';
import { environment } from './configs/environment';
import { rateLimiterOptions } from './configs/rate-limiter-options';
import { urlencodedOptions } from './configs/urlencoded-options';
import { errorHandler } from './middlewares/error-handler';
import { router } from './routes/router';
import { killProcess } from './utils';

const app = express();

// Serve public files
app.use(express.static('public'));

// Security & performance config
app.disable('x-powered-by');
app.use(helmet());
app.use(compression(compressionOptions));
app.use(cors(corsOptions));
app.use(rateLimit(rateLimiterOptions));

// parsers
app.use(json());
app.use(urlencoded(urlencodedOptions));
app.use(cookieParser());

// Main router
app.use('/api', router);

// Error handler
app.use(errorHandler);

app.listen(environment.PORT, () => console.log(`Server available on port ${environment.PORT}.`));

// Graceful shutdown
process.on('SIGTERM', killProcess);
process.on('SIGINT', killProcess);
