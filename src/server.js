import express from 'express';
import helmet from 'helmet';

import mainRoutes from './main.routes';
import userRoutes from './user.routes';
import { rateLimit } from 'express-rate-limit';
import compression from 'compression';

const app = express();
const port = 3001;

const limiter = rateLimit({
	windowMs: 5 * 60 * 1000, // 5 minutes
	limit: 100, // Limit each IP to 100 requests per `window` (here, per 5 minutes).
	standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
	// store: ... , // Redis, Memcached, etc. See below.
})

/**
 * Middleware to compress the HTTP response.
 * This will reduce the size of the response body and improve performance by sending compressed data to the client.
 * It uses Gzip or Brotli compression based on the client's supported encoding.
 */
//app.use(compression);

/**
 * Apply the rate limiting middleware to all requests.
 */
app.use(limiter);

/**
 * Middleware to parse incoming requests with JSON payloads.
 */
app.use(express.json());

/**
 * Middleware to add security headers to the response.
 * Helmet helps secure the app by setting various HTTP headers.
 */
app.use(helmet());

/**
 * Defines the route for the main API version.
 * All routes under '/v1' will be handled by mainRoutes.
 */
app.use('/v1', mainRoutes);

/**
 * Defines the route for user-specific API version.
 * All routes under '/v1/user' will be handled by userRoutes.
 */
app.use('/v1/user', userRoutes);

/**
 * Starts the server and listens on the defined port.
 * Logs a message to the console once the server is running.
 */
app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});