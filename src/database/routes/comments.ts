import express from "express";
import Meme from "../model/meme";

const commentsRouter = express.Router();

// Route to create a new user
commentsRouter.post('/', async (req, res) => {
  try {
    const reqData = req.body;
    const { likes,dislikes,reaction_id,id,user_id,post_id } = reqData;

    // Validate request data
    if (!id) {
      return res.status(400).send({ message: "Please enter your nickname" });
    }

    if (!user_id) {
      return res.status(400).send({ message: "Please enter your name" });
    }

    if (!reaction_id) {
      return res.status(400).send({ message: "Please enter your age" });
    }

    if (!post_id) {
      return res.status(400).send({ message: "Please enter your phone number" });
    }

    if (!likes) {
      return res.status(400).send({ message: "Please enter your password" });
    }

    if (!dislikes) {
      return res.status(400).send({ message: "Please enter your email" });
    }

    // Create user object and save to database
    const createUserObject: any = {
      
    };

    const createUsers = await Meme.create(createUserObject);
    res.status(200).send({ message: "User created successfully", data: createUsers });
  } catch (error) {
    return res.status(500).send({ message: `Error submitting details: ${error}` });
  }
});

// Route to fetch all users
 commentsRouter.get('/', async (req, res) => {
  try {
    const responseUsersData = await Meme.findAll();
    res.send({ message: "Data fetched successfully", data: responseUsersData });
  } catch (error: any) {
    res.send({ message: error.message });
  }
});

// Route to update user data
commentsRouter.post('/update', async (req, res) => {
  try {
    const response = await Meme.update(req.body, { where: { user_id: req.body.user_id } });
    res.send({ message: 'Column updated successfully' });
  } catch (error: any) {
    res.send({ message: error.message });
  }
});

// Route to soft delete a user
 commentsRouter.patch('/:user_id', async (req, res) => {
  try {
    const response = await Meme.update({ is_deleted: true, soft_delete: true }, { where: { user_id: parseInt(req.params.user_id) } });
    res.send({ message: 'Successfully updated' });
  } catch (error: any) {
    res.send({ message: error.message });
  }
});

export default commentsRouter;