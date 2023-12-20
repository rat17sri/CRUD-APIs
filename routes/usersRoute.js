const express = require('express');
const router = express.Router();

const usersController = require('../controllers/usersController');

/**
 * * route to get all users
 * @return all users
 */
router.get('/', usersController.getUsers);

/**
 * * route to get single user
 * @param userID
 * @return a user
 */
router.get('/:userId', usersController.getUserById);

/**
 * * route to save a user
 * @return saved user
 */
router.post('/', usersController.saveUser);

/**
 * * route to update a user
 * @param userId
 * @return updated user
 */
router.put('/:userId', usersController.updateUser);

/**
 * * route to delete a user
 * @param userId
 */
router.delete('/:userId', usersController.deleteUser)

module.exports = router;