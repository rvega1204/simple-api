import { StatusCodes } from 'http-status-codes';
import pino from 'pino';

import userService from '../services/user.service';

// Status constants for success and failure
const STATUS = {
    success: true,
    failure: false
};

// Logger const for pino
const logger = pino();

/**
 * Updates a user by their ID with new details.
 * @param {Object} req - The request object containing the user data and ID.
 * @param {Object} res - The response object to send the result.
 * @returns {Object} A response object with the status and the updated user or an error message.
 */
const updateUser = (req, res) => {
    const { body: user } = req;
    const id = parseInt(req.params.id, 10);
    const updatedUser = userService.updateUser(id, user);

    if (updatedUser) {
        logger.info(`Updating userId: ${id}`);
        return res.status(StatusCodes.OK).send({
            status: STATUS.success,
            message: updatedUser
        });
    } else {
        return res.status(StatusCodes.NOT_FOUND).send({
            status: STATUS.failure,
            message: `User ${id} not found`
        });
    }
};

/**
 * Adds a new user to the system.
 * @param {Object} req - The request object containing the new user data.
 * @param {Object} res - The response object to send the result.
 * @returns {Object} A response object with the status and the added user details.
 */
const addedUser = (req, res) => {
    const { body: user } = req;
    const addedUser = userService.addUser(user);

    logger.info('Creating user');

    return res.status(StatusCodes.CREATED).send({
        status: STATUS.success,
        user: addedUser,
    });
};

/**
 * Retrieves all users from the system.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object to send the result.
 * @returns {Object} A response object containing all users or an error message.
 */
const getAllUsers = (req, res) => {
    const users = userService.getAllUsers();
    if (users.length) {
        return res.status(StatusCodes.OK).send(users);
    }

    return res.status(StatusCodes.NOT_FOUND).send({
        status: STATUS.failure,
        message: 'No users found.'
    });
};

/**
 * Retrieves a user by their ID.
 * @param {Object} req - The request object containing the user ID.
 * @param {Object} res - The response object to send the result.
 * @returns {Object} A response object containing the user data or an error message.
 */
const getUser = (req, res) => {
    const id = parseInt(req.params.id, 10);
    const user = userService.getUser(id);
    if (user) {
        logger.info(`Getting user ${id}`)
        return res.status(StatusCodes.OK).send(user);
    }

    return res.status(StatusCodes.NOT_FOUND).send({
        status: STATUS.failure,
        message: `User id: ${id} not found`
    });
};

/**
 * Deletes a user by their ID.
 * @param {Object} req - The request object containing the user ID to be deleted.
 * @param {Object} res - The response object to send the result.
 * @returns {Object} A response object with the status and message confirming deletion or an error message.
 */
const deleteUser = (req, res) => {
    const { params } = req;
    const id = parseInt(params.id);
    const user = userService.getUser(id);
    if (user) {
        userService.removeUser(id);
        logger.info(`Deleting userId: ${id}`)
        return res.status(StatusCodes.OK).send({
            status: STATUS.success,
            message: `User id: ${id} deleted`
        });
    } else {
        return res.status(StatusCodes.NOT_FOUND).send({
            status: STATUS.failure,
            message: `User id: ${id} is not found`
        });
    }
};

export default {
    updateUser,
    addedUser,
    getAllUsers,
    getUser,
    deleteUser
};