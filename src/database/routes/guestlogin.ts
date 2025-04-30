import express from "express";
import users from "../model/users";

const guestUsersRouter = express.Router();

guestUsersRouter.post("/user", async (req, res) => {
  try {
    const { user_name, age } = req.body;

    if (!user_name || user_name.trim() === '') {
      return res.status(400).send({ message: "Please enter your nickname" });
    }
    if (!age || isNaN(age) || age < 14 || age > 100) {
      return res.status(400).send({ message: "Please enter a valid age between 14 and 100" });
    }

    const createGuestUserObject:any ={
        user_name: user_name,
        age:age,
    }
    const createGuestUser= await users.create(createGuestUserObject);

    res.status(201).send({ message: "Guest user created successfully", data: createGuestUser });
  } catch (error:any) {
    if (error.name === 'SequelizeValidationError') {
      return res.status(400).send({ message: `Validation error: ${error.errors.map((e: any) => e.message).join(', ')}` });
    }
    res.status(500).send({ message: `Error submitting details: ${error.message}` });
  }
});

// guestUsersRouter.get("/guest", async (req, res) => {
//   try {
//     const guestUsers = await users.findAll();
//     res.send({ message: "Data fetched successfully", data: users });
//   } catch (error: any) {
//     res.status(500).send({ message: error.message });
//   }
// });

// guestUsersRouter.post("/guest", async (req, res) => {
//   try {
//     const { user_id, ...updateData } = req.body;
//     await users.update(updateData, { where: { user_id } });
//     res.send({ message: "Column updated successfully" });
//   } catch (error: any) {
//     res.status(500).send({ message: error.message });
//   }
// });

// guestUsersRouter.patch("/:user_id", async (req, res) => {
//   try {
//     await users.update(
//       { soft_delete: true, Active: false },
//       { where: { user_id: parseInt(req.params.user_id) } }
//     );
//     res.send({ message: "Successfully updated" });
//   } catch (error: any) {
//     res.status(500).send({ message: error.message });
//   }
// });

export default guestUsersRouter;
