// src/routes/usersRouter.ts

import express from 'express';
import { RoomsScreen } from '../model/RoomsScreen';

const roomsRouter = express.Router();

roomsRouter.post('/roomscreen', async (req, res) => {
  try {
    const reqData = req.body;
    const { room_name, room_password, user_id, status } = reqData;

    if (!room_name || !room_password || !user_id) {
      return res.status(400).send({ message: "Missing required fields" });
    }

    const createRoomObject: any = {
      room_name,
      room_password,
      user_id,
      status: status || 'active',
    };

    const createdRoom = await RoomsScreen.create(createRoomObject);
    res.status(200).send({
      message: "Room created successfully",
      DataTransfer: createdRoom,
    });

  } catch (error) {
    return res.status(500).send({ messageError: `Error submitting details: ${error}` });
  }
});

roomsRouter.get('/', async (req, res) => {
  try {
    const responseRoomsData = await RoomsScreen.findAll();
    res.send({ message: "Data fetched successfully", data: responseRoomsData });
  } catch (error: any) {
    res.send({ message: error.message });
  }
});



roomsRouter.post('/update', async (req, res) => {
  try {
    const { room_id, ...updateData } = req.body;
    const response = await RoomsScreen.update(updateData, { where: { room_id } });
    res.send({ message: 'Room updated successfully' });
  } catch (error: any) {
    res.send({ message: error.message });
  }
});

roomsRouter.patch('/:room_id', async (req, res) => {
  try {
    const roomId = parseInt(req.params.room_id);
    const response = await RoomsScreen.update({ is_deleted: true, status: 'inactive' }, { where: { room_id: roomId } });
    res.send({ message: 'Room marked as deleted successfully' });
  } catch (error: any) {
    res.send({ message: error.message });
  }
});

export default roomsRouter;

