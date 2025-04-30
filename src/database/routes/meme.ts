import express from "express";
import Meme from "../model/meme";

const memeRouter = express.Router();

// Route to create a new user
memeRouter.post('/', async (req, res) => {
  try {
    const reqData = req.body;
    const { user_name, name, age, phone, password_hashed, email } = reqData;

    // Validate request data
    if (!user_name) {
      return res.status(400).send({ message: "Please enter your nickname" });
    }

    if (!name) {
      return res.status(400).send({ message: "Please enter your name" });
    }

    if (!age) {
      return res.status(400).send({ message: "Please enter your age" });
    }

    if (!phone) {
      return res.status(400).send({ message: "Please enter your phone number" });
    }

    if (!password_hashed) {
      return res.status(400).send({ message: "Please enter your password" });
    }

    if (!email) {
      return res.status(400).send({ message: "Please enter your email" });
    }

    // Create user object and save to database
    const createUserObject: any = {
      user_name,
      name,
      age,
      phone,
      password_hashed,
      email,
    };

    const createUsers = await Meme.create(createUserObject);
    res.status(200).send({ message: "User created successfully", data: createUsers });
  } catch (error) {
    return res.status(500).send({ message: `Error submitting details: ${error}` });
  }
});

// Route to fetch all users
memeRouter.get('/', async (req, res) => {
  try {
    const responseUsersData = await Meme.findAll();
    res.send({ message: "Data fetched successfully", data: responseUsersData });
  } catch (error: any) {
    res.send({ message: error.message });
  }
});

// Route to update user data
memeRouter.post('/update', async (req, res) => {
  try {
    const response = await Meme.update(req.body, { where: { user_id: req.body.user_id } });
    res.send({ message: 'Column updated successfully' });
  } catch (error: any) {
    res.send({ message: error.message });
  }
});

// Route to soft delete a user
memeRouter.patch('/:user_id', async (req, res) => {
  try {
    const response = await Meme.update({ is_deleted: true, soft_delete: true }, { where: { user_id: parseInt(req.params.user_id) } });
    res.send({ message: 'Successfully updated' });
  } catch (error: any) {
    res.send({ message: error.message });
  }
});

export default memeRouter;