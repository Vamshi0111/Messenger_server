import { Router, Request, Response } from 'express';
import Message from '../model/message';

const MessageRouter = Router();

MessageRouter.post('/', async (req: Request, res: Response) => {
    try {
        const reqData = req.body;
        const { user_id, type, status, is_deleted } = reqData;

        if (!user_id) {
            return res.status(400).send({ message: "Please enter user ID" });
        }
        if (!type) {
            return res.status(400).send({ message: "Please enter message type" });
        }
        if (!status) {
            return res.status(400).send({ message: "Please enter status" });
        }

        const createMessageObject: any = {
            user_id,
            type,
            status,
            is_deleted
        };

        const createMessage = await Message.create(createMessageObject);
        res.status(200).send({
            message: "Message created successfully",
            DataTransfer: createMessage,
        });
    } catch (error: any) {
        return res.status(500).send({ messageError: `Error submitting details: ${error.message}` });
    }
});

MessageRouter.get('/', async (req: Request, res: Response) => {
    try {
        const responseMessagesData = await Message.findAll();
        res.send({ message: "Data fetched successfully", data: responseMessagesData });
    } catch (error: any) {
        res.send({ message: error.message });
    }
});

MessageRouter.post('/update', async (req: Request, res: Response) => {
    try {
        const response = await Message.update(req.body, { where: { message_id: req.body.message_id } });
        res.send({ message: 'Column updated successfully' });
    } catch (error: any) {
        res.send({ message: error.message });
    }
});

MessageRouter.patch('/:message_id', async (req: Request, res: Response) => {
    try {
        const response = await Message.update({ is_deleted: true }, { where: { message_id: parseInt(req.params.message_id) } });
        res.send({ message: 'Successfully marked as deleted' });
    } catch (error: any) {
        res.send({ message: error.message });
    }
});

MessageRouter.get('/:message_id', async (req: Request, res: Response) => {
    const { message_id } = req.params;
    try {
        const message = await Message.findByPk(message_id);
        if (message) {
            res.status(200).json(message);
        } else {
            res.status(404).json({ message: 'Message not found' });
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

MessageRouter.delete('/:message_id', async (req: Request, res: Response) => {
    const { message_id } = req.params;
    try {
        const deleted = await Message.destroy({ where: { message_id } });
        if (deleted) {
            res.status(204).json({ message: 'Message deleted' });
        } else {
            res.status(404).json({ message: 'Message not found' });
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

export default MessageRouter;
