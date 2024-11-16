/**
 * Import the in-memory database of users.
 * This is a placeholder for actual database operations.
 */
import users from "../data/users.data";

/**
 * Inserts a new user into the in-memory database.
 * @function
 * @param {Object} details - The details of the user to insert.
 * @returns {Object} The newly created user object with a unique ID.
 */
const insert = (details) => {
    const newUser = { id: users.length + 1, ...details }; // Generate a new ID based on the current length
    users.push(newUser); // Add the new user to the array

    return newUser; // Return the created user
};

/**
 * Retrieves a user by their ID.
 * @function
 * @param {number} userId - The ID of the user to retrieve.
 * @returns {Object|undefined} The user object if found, otherwise `undefined`.
 */
const get = (userId) => users.find((user) => user.id === userId);

/**
 * Retrieves all users from the in-memory database.
 * @function
 * @returns {Array} An array of all user objects.
 */
const getAll = () => users;

/**
 * Updates a user by their ID with new details.
 * @function
 * @param {number} userId - The ID of the user to update.
 * @param {Object} newDetails - An object containing the updated user details.
 * @returns {Object|boolean} The updated user object if successful, otherwise `false`.
 */
const update = (userId, newDetails) => {
    let currentUser = null;
    let userIndex;

    // Find the user and its index
    users.map((user, index) => {
        if (user.id === userId) {
            currentUser = user;
            userIndex = index;
        }
    });

    if (!currentUser) {
        return false; // User not found
    }

    // Merge the current user details with the new details
    const updatedUser = {
        ...currentUser,
        ...newDetails,
    };

    users.splice(userIndex, 1, updatedUser); // Replace the old user with the updated one
    return updatedUser;
};

/**
 * Removes a user by their ID.
 * @function
 * @param {number} userId - The ID of the user to remove.
 * @returns {Object|undefined} The removed user object if successful, otherwise `undefined`.
 */
const remove = (userId) => {
    const deleteUser = (user, index) => {
        if (user?.id === userId) {
            users.splice(index, 1); // Remove the user at the found index
        }
    };

    return users.find(deleteUser); // Return the deleted user
};

/**
 * Exports the user service functions for CRUD operations.
 */
export default {
    insert,
    get,
    getAll,
    update,
    remove,
};