import userDao from '../modules/persistence/user.dao';

/**
 * Adds a new user to the database.
 * @param {Object} details - The details of the user to be added.
 * @returns {Object} The newly added user.
 */
const addUser = (details) => userDao.insert(details);

/**
 * Retrieves a user by their ID from the database.
 * @param {number} userId - The ID of the user to retrieve.
 * @returns {Object|null} The user object if found, or null if the user does not exist.
 */
const getUser = (userId) => userDao.get(userId);

/**
 * Retrieves all users from the database.
 * @returns {Array} An array of all users.
 */
const getAllUsers = () => userDao.getAll();

/**
 * Updates an existing user in the database.
 * @param {number} userId - The ID of the user to update.
 * @param {Object} details - The new details for the user.
 * @returns {Object|null} The updated user object if the update was successful, or null if the user was not found.
 */
const updateUser = (userId, details) => userDao.update(userId, details);

/**
 * Removes a user from the database by their ID.
 * @param {number} userId - The ID of the user to remove.
 * @returns {boolean} `true` if the user was successfully removed, `false` otherwise.
 */
const removeUser = (userId) => userDao.remove(userId);

export default {
    getUser,
    getAllUsers,
    addUser,
    updateUser,
    removeUser
};