const { v4: uuidv4 } = require('uuid');

const client = require("../configs/db");
const validateUUID = require('../middleware/validateUUID');

class UsersController {

    getUsers = async (req, res, next) => {
        try {

            const keys = await client.keys('user:*');

            const multi = client.multi();

            keys.forEach((key) => multi.hGetAll(key));

            const replies = await multi.exec();

            const users = replies.map((reply) => ({
                id: reply.id,
                username: reply.username,
                age: Number(reply.age),
                hobbies: JSON.parse(reply.hobbies) || [],
            }));

            res.status(200).json(users);

        } catch (error) {
            next(error);
        }
    }

    getUserById = async (req, res, next) => {
        try {
            const userId = req.params.userId;

            const isValid = validateUUID(userId);

            if (!isValid) {
                return res.status(400).json({ error: 'userId is not a valid uuid.' });
            }

            const user = await client.hGetAll(`user:${userId}`);

            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }

            res.status(200).json(user);

        } catch (error) {
            next(error);
        }
    }

    saveUser = async (req, res, next) => {
        try {

            const { username, age, hobbies } = req.body;

            if (!username || !age || !hobbies) {
                return res.status(400).json({ error: 'All fields are required.' });
            }

            const newUser = { id: uuidv4(), username, age, hobbies };

            await client.hSet(`user:${newUser.id}`, { ...newUser, hobbies: JSON.stringify(hobbies) });

            res.status(201).json(newUser);

        } catch (error) {
            next(error);
        }
    }

    updateUser = async (req, res, next) => {
        try {

            const userId = req.params.userId;

            const isValid = validateUUID(userId);

            if (!isValid) {
                return res.status(400).json({ error: 'userId is not a valid uuid.' });
            }

            const { username, age, hobbies } = req.body;

            const existingUser = await client.hGetAll(`user:${userId}`);

            if (!existingUser) {
                return res.status(404).json({ error: 'User does not exist' });
            }

            const updatedUser = {
                id: userId,
                username: username || existingUser.username,
                age: age || existingUser.age,
                hobbies: hobbies || existingUser.hobbies
            };

            await client.hSet(`user:${userId}`, updatedUser);

            res.status(200).json(updatedUser);

        } catch (error) {
            next(error);
        }
    }

    deleteUser = async (req, res, next) => {
        try {
            const userId = req.params.userId;

            const isValid = validateUUID(userId);

            if (!isValid) {
                return res.status(400).json({ error: 'userId is not a valid uuid.' });
            }

            const userExists = await client.exists(`user:${userId}`);

            if (!userExists) {
                return res.status(404).json({ error: 'User does not exist' });
            }

            await client.del(`user:${userId}`);

            res.status(204).json({ message: 'User deleted successfully' });

        } catch (error) {
            next(error);
        }
    }

}

module.exports = new UsersController();