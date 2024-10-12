import express from 'express';
import compression from 'compression';
import cors from 'cors';
import helmet from 'helmet';

import corsOptions from 'configs/cors-options';
import router from 'routes/rooter';

const app = express();

// Security & performance config
app.disable('x-powered-by');
app.use(helmet());
app.use(compression());
app.use(cors(corsOptions));

// JSON body parser
app.use(express.json());

app.use('/api', router);

app.listen(process.env.PORT, () => console.log(`Server available on port ${process.env.PORT}.`));
