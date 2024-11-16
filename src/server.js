import express from 'express';
import helmet from 'helmet';

import mainRoutes from './main.routes';
import userRoutes from './user.routes';

const app = express();
const port = 3001;

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