import express from "express";
import People from "../model/people";


const peopleRouter = express.Router();

// Create - Add Friend
peopleRouter.post('/', async (req, res) => {
    try {
        const { people_id } = req.body;

        if (!people_id) {
            return res.status(400).send({ message: "Please provide people_id" });
        }

        const newFriend = await People.create({ people_id, status: 'sent' });
        res.status(200).send({ message: "Friend request sent successfully", data: newFriend });
    } catch (error: any) {
        res.status(500).send({ messageError: `Error adding friend: ${error.message}` });
    }
});

// Read - Your Friends
peopleRouter.get('/:people_id', async (req, res) => {
    try {
        const { people_id } = req.params;
        const friends = await People.findAll({ where: { people_id, status: 'friends' } });
        res.status(200).send({ message: "Friends fetched successfully", data: friends });
    } catch (error: any) {
        res.status(500).send({ messageError: `Error fetching friends: ${error.message}` });
    }
});

// Update - Block your Friend
peopleRouter.patch('/block', async (req, res) => {
    try {
        const { people_id } = req.body;

        if (!people_id) {
            return res.status(400).send({ message: "Please provide people_id" });
        }

        const updatedFriend = await People.update({ status: 'blocked' }, { where: { people_id } });
        res.status(200).send({ message: "Friend blocked successfully", data: updatedFriend });
    } catch (error: any) {
        res.status(500).send({ messageError: `Error blocking friend: ${error.message}` });
    }
});

// Delete - Unfriend your Friend
peopleRouter.delete('/:people_id', async (req, res) => {
    try {
        const { people_id } = req.params;

        if (!people_id) {
            return res.status(400).send({ message: "Please provide people_id" });
        }

        await People.destroy({ where: { people_id } });
        res.status(200).send({ message: "Friend removed successfully" });
    } catch (error: any) {
        res.status(500).send({ messageError: `Error removing friend: ${error.message}` });
    }
});

export default peopleRouter;
