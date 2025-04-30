// src/database/routes/chat.ts
import express from 'express';
import Chat, { ChatCreationAttributes } from '../model/chat';

const chatRouter = express.Router();

interface CustomRequest extends express.Request {
  io?: any;
}

chatRouter.post('/', async (req: any, res) => {
  try {

    const user:any = req?.user

    const { sender_id, receiver_id, message_text, user_id, user_name } = req.body;

    if (!sender_id || !receiver_id || !message_text || !user_id || !user_name) {
      return res.status(400).send({ message: 'Please provide all required fields' });
    }

    const newChat: ChatCreationAttributes = {
      sender_id,
      receiver_id,
      message_text,
      user_id,
      user_name,
      is_deleted: false,
    };

    const createdChat = await Chat.create(newChat);
    req.io?.emit('receiveMessage', createdChat);

    res.status(201).send({ success: true, message: 'Message created successfully', data: createdChat });
  } catch (error: any) {
    res.status(500).send({ message: 'Error creating message', error: error.message });
  }
});

chatRouter.get('/', async (req, res) => {
  try {
    const allChats = await Chat.findAll({
      where: {
        is_deleted: false,
      },
    });

    res.status(200).send({ message: 'Messages fetched successfully', data: allChats });
  } catch (error: any) {
    res.status(500).send({ message: 'Error fetching messages', error: error.message });
  }
});

chatRouter.patch('/:chat_id', async (req, res) => {
  try {
    const chat_id = req.params.chat_id;

    const [updated] = await Chat.update(
      { is_deleted: true, deletedAt: new Date() },
      { where: { chat_id } }
    );

    if (updated) {
      res.status(200).send({ message: 'Message soft deleted successfully' });
    } else {
      res.status(404).send({ message: 'Message not found' });
    }
  } catch (error: any) {
    res.status(500).send({ message: 'Error soft deleting message', error: error.message });
  }
});

const initializeSocket = (io: any) => {
  io.on('connection', (socket: any) => {
    console.log('a user connected');

    socket.on('sendMessage', async (newMessage: ChatCreationAttributes) => {
      try {
        const message = await Chat.create(newMessage);
        io.emit('receiveMessage', message);
      } catch (error) {
        console.error('Error saving message to database:', error);
      }
    });

    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
  });
};

export { initializeSocket };
export default chatRouter;
