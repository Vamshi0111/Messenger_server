// src/routes/conversationsRouter.ts

import express from 'express';
import { Conversation } from '../model/Conversations';

const conversationsRouter = express.Router();

conversationsRouter.post('/', async (req, res) => {
  try {
    const reqData = req.body;
    const { user1_id, user2_id, status, start_time, end_time } = reqData;

    if (!user1_id || !user2_id || !start_time) {
      return res.status(400).send({ message: "Missing required fields" });
    }

    const createConversationObject: any = {
      user1_id,
      user2_id,
      status: status || 'active',
      start_time,
      end_time,
    };

    const createdConversation = await Conversation.create(createConversationObject);
    res.status(200).send({
      message: "Conversation created successfully",
      data: createdConversation,
    });

  } catch (error) {
    return res.status(500).send({ messageError: `Error submitting details: ${error}` });
  }
});

conversationsRouter.get('/', async (req, res) => {
  try {
    const responseConversationsData = await Conversation.findAll();
    res.send({ message: "Data fetched successfully", data: responseConversationsData });
  } catch (error: any) {
    res.send({ message: error.message });
  }
});

conversationsRouter.post('/update', async (req, res) => {
  try {
    const { conversation_id, ...updateData } = req.body;
    const response = await Conversation.update(updateData, { where: { conversation_id } });
    res.send({ message: 'Conversation updated successfully' });
  } catch (error: any) {
    res.send({ message: error.message });
  }
});

conversationsRouter.patch('/:conversation_id', async (req, res) => {
  try {
    const conversationId = parseInt(req.params.conversation_id);
    const response = await Conversation.update({ status: 'inactive', end_time: new Date() }, { where: { conversation_id: conversationId } });
    res.send({ message: 'Conversation marked as inactive successfully' });
  } catch (error: any) {
    res.send({ message: error.message });
  }
});

export default conversationsRouter;
