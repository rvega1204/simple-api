import * as Yup from 'yup';

// Constants for the minimum and maximum lengths for various fields
const MIN_LENGTH = {
  name: 2, 
  city: 3,
  country: 4,
  email: 10
};

const MAX_LENGTH = {
  name: 30, 
  city: 20,
  country: 25,
  email: 65
};

/**
 * Schema for adding a user. Validates the required fields with proper length constraints.
 * @type {Object}
 */
export const addedUser = {
  schema: {
    query: {
      yupSchema: Yup.object().shape({}),
    },
    body: {
      yupSchema: Yup.object().shape({
        name: Yup.string().min(MIN_LENGTH.name).max(MAX_LENGTH.name),
        email: Yup.string().email("Invalid email").required("Email is required").min(MIN_LENGTH.email).max(MAX_LENGTH.email),
        city: Yup.string().min(MIN_LENGTH.city).max(MAX_LENGTH.city),
        country: Yup.string().min(MIN_LENGTH.country).max(MAX_LENGTH.country),
      }),
    },
    params: {
      yupSchema: Yup.object().shape({}),
    },
  },
};

/**
 * Schema for updating a user. Validates the user's information and requires a valid ID parameter.
 * @type {Object}
 */
export const updateUser = {
  schema: {
    query: {
      yupSchema: Yup.object().shape({}),
    },
    body: {
      yupSchema: Yup.object().shape({
        name: Yup.string().min(MIN_LENGTH.name).max(MAX_LENGTH.name),
        email: Yup.string().email("Invalid email").required("Email is required"),
        city: Yup.string().min(MIN_LENGTH.city).max(MAX_LENGTH.city),
        country: Yup.string().min(MIN_LENGTH.country).max(MAX_LENGTH.country),
      }),
    },
    params: {
      yupSchema: Yup.object().shape({
        id: Yup.number().required(),
      }),
    },
  },
};

/**
 * Schema for retrieving a user. Validates that the user ID parameter is provided.
 * @type {Object}
 */
export const getUser = {
  schema: {
    query: {
      yupSchema: Yup.object().shape({}),
    },
    body: {
      yupSchema: Yup.object().shape({}),
    },
    params: {
      yupSchema: Yup.object().shape({
        id: Yup.number().required(),
      }),
    },
  },
};

/**
 * Schema for deleting a user. Validates that the user ID parameter is provided.
 * @type {Object}
 */
export const deleteUser = {
  schema: {
    query: {
      yupSchema: Yup.object().shape({}),
    },
    body: {
      yupSchema: Yup.object().shape({}),
    },
    params: {
      yupSchema: Yup.object().shape({
        id: Yup.number().required(),
      }),
    },
  },
};