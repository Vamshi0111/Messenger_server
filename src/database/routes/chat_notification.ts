import { Router, Request, Response } from 'express';
 import Notification from '../model/chat_notification';



const notificationRouter = Router();

notificationRouter.post('/', async (req: Request, res: Response) => {
    try {
        const newNotification = await Notification.create(req.body);
        res.status(201).json(newNotification);
    } catch (error:any) {
        res.status(500).json({ error: error.message });
    }
});

notificationRouter.get('/', async (req: Request, res: Response) => {
    try {
        const notifications = await Notification.findAll();
        res.status(200).json(notifications);
    } catch (error:any) {
        res.status(500).json({ error: error.message });
    }
});

notificationRouter.get('/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const notification = await Notification.findByPk(id);
        if (notification) {
            res.status(200).json(notification);
        } else {
            res.status(404).json({ message: 'Notification not found' });
        }
    } catch (error:any) {
        res.status(500).json({ error: error.message });
    }
});

notificationRouter.put('/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const [updated] = await Notification.update(req.body, {
            where: { notification_id: id }
        });
        if (updated) {
            const updatedNotification = await Notification.findByPk(id);
            res.status(200).json(updatedNotification);
        } else {
            res.status(404).json({ message: 'Notification not found' });
        }
    } catch (error:any) {
        res.status(500).json({ error: error.message });
    }
});

notificationRouter.delete('/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const deleted = await Notification.destroy({
            where: { notification_id: id }
        });
        if (deleted) {
            res.status(204).json({ message: 'Notification deleted' });
        } else {
            res.status(404).json({ message: 'Notification not found' });
        }
    } catch (error:any) {
        res.status(500).json({ error: error.message });
    }
});

export default notificationRouter;


