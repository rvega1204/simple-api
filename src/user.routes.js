/**
 * Import the main Express module to handle routes and servers.
 */
import express from 'express';

/**
 * Import the Yup validation middleware to validate incoming requests.
 */
import { expressYupMiddleware } from 'express-yup-middleware';

/**
 * Import the controller containing business logic for user operations.
 */
import userController from './controllers/user.controller';

/**
 * Import Yup validation schemas for different operations:
 * - `addedUser`: Schema to validate adding a new user.
 * - `updateUser`: Schema to validate updating a user.
 * - `getUser`: Schema to validate fetching a user by ID.
 * - `deleteUser`: Schema to validate deleting a user by ID.
 */
import { addedUser, updateUser, getUser, deleteUser } from './user.schemas';

/**
 * Create a new instance of the Express router.
 */
const router = express.Router();

/**
 * Define the port where the application will run.
 * @constant {number} port
 */
const port = 3001;

/**
 * Route to fetch all users.
 * @name GET /all
 * @function
 * @memberof module:routes/user
 */
router.get('/all', userController.getAllUsers);

/**
 * Route to fetch a specific user by ID.
 * @name GET /:id
 * @function
 * @memberof module:routes/user
 * @param {string} id - The ID of the user to fetch.
 */
router.get(
    '/:id',
    expressYupMiddleware({
        schemaValidator: getUser, // Validates that the ID in the request meets the `getUser` schema
    }),
    userController.getUser // Controller handling the logic to retrieve a user
);

/**
 * Route to add a new user.
 * @name POST /
 * @function
 * @memberof module:routes/user
 * @param {object} user - The user data to be added.
 */
router.post(
    '/',
    expressYupMiddleware({
        schemaValidator: addedUser, // Validates that the request body meets the `addedUser` schema
    }),
    userController.addedUser // Controller handling the logic to add a new user
);

/**
 * Route to update an existing user by ID.
 * @name PUT /:id
 * @function
 * @memberof module:routes/user
 * @param {string} id - The ID of the user to update.
 * @param {object} user - The new user data.
 */
router.put(
    '/:id',
    expressYupMiddleware({
        schemaValidator: updateUser, // Validates that the request body and ID meet the `updateUser` schema
    }),
    userController.updateUser // Controller handling the logic to update a user
);

/**
 * Route to delete a user by ID.
 * @name DELETE /:id
 * @function
 * @memberof module:routes/user
 * @param {string} id - The ID of the user to delete.
 */
router.delete(
    '/:id',
    expressYupMiddleware({
        schemaValidator: deleteUser, // Validates that the ID in the request meets the `deleteUser` schema
    }),
    userController.deleteUser // Controller handling the logic to delete a user
);

/**
 * Export the router to be used in the main application.
 */
export default router;