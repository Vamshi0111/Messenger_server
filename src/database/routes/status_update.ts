import express, { Express, Request, Response } from "express";
import status_update from "../model/status_update";

const status_updateRouter = express.Router();

status_updateRouter.post('/', async (req: Request, res: Response) => {
    try {
        const reqData = req.body;
        const { status_id, content } = reqData;

        if (!status_id || status_id.length === 0) {
            return res.status(400).send({ message: "Please enter your STATUS ID" });
        }

        if (!content || content.length === 0) {
            return res.status(400).send({ message: "Please mention your CONTENT" });
        }

        const createUserObject:any = {
            status_id: status_id,
            content: content
        };

        const createUsers = await status_update.create(createUserObject);
        res.status(200).send({
            message: "Users created successfully",
            DataTransfer: createUsers
        });

    } catch (error: any) {
        return res.status(500).send({ messageError: `error submitting Details: ${error.message}` });
    }
});

status_updateRouter.get('/', async (req: Request, res: Response) => {
    try {
        const responseUsersData = await status_update.findAll();
        res.send({ message: "Data fetched successfully", data: responseUsersData });
    } catch (error: any) {
        res.send({ message: error.message });
    }
});

status_updateRouter.post('/update', async (req: Request, res: Response) => {
    try {
        const { user_id, ...updateData } = req.body;
        const response = await status_update.update(updateData, { where: { user_id: user_id } });
        res.send({ message: 'Column updated successfully' });
    } catch (error: any) {
        res.send({ message: error.message });
    }
});

status_updateRouter.patch('/:user_id', async (req: Request, res: Response) => {
    try {
        const response = await status_update.update({ is_deleted: true }, { where: { user_id: parseInt(req.params.user_id) } });
        res.send({ message: 'Successful' });
    } catch (error: any) {
        res.send({ message: error.message });
    }
});

export default status_updateRouter;
