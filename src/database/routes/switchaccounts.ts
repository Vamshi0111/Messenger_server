import express from "express";
import { Request, Response } from "express";
import SwitchAccounts from "../model/switchaccount";
const switchAccountsRouter = express.Router();

// Create a switch account
switchAccountsRouter.post('/', async (req: Request, res: Response) => {
    try {
        const { user_id, linked_account_id } = req.body;

        if (!user_id || user_id === 0) {
            return res.status(400).send({ message: "Please provide a valid user ID" });
        }

        if (!linked_account_id || linked_account_id === 0) {
            return res.status(400).send({ message: "Please provide a valid linked account ID" });
        }

        const createSwitchAccountObject = {
            user_id,
            linked_account_id
        };

        const createSwitchAccount = await SwitchAccounts.create(createSwitchAccountObject);
        res.status(201).send({
            message: "Switch account created Successfully",
            DataTransfer: createSwitchAccount
        });

    } catch (error) {
        return res.status(500).send({ messageError: `Error submitting details: ${error}` });
    }
});

// Get all switch accounts
switchAccountsRouter.get('/', async (req: Request, res: Response) => {
    try {
        const responseSwitchAccountsData = await SwitchAccounts.findAll();
        res.status(200).send({ message: "Data fetched successfully", data: responseSwitchAccountsData });
    } catch (error: any) {
        res.status(500).send({ message: error.message });
    }
});

// Get a switch account by ID
switchAccountsRouter.get('/:switchaccounts_id', async (req: Request, res: Response) => {
    try {
        const switchAccount = await SwitchAccounts.findByPk(req.params.switchaccounts_id);
        if (switchAccount) {
            res.status(200).send(switchAccount);
        } else {
            res.status(404).send({ message: 'Switch account not found' });
        }
    } catch (error: any) {
        res.status(500).send({ message: error.message });
    }
});

// Update a switch account
switchAccountsRouter.put('/:switchaccounts_id', async (req: Request, res: Response) => {
    try {
        const switchAccount = await SwitchAccounts.findByPk(req.params.switchaccounts_id);
        if (switchAccount) {
            await switchAccount.update(req.body);
            res.status(200).send({
                message: 'Switch account updated successfully',
                DataTransfer: switchAccount
            });
        } else {
            res.status(404).send({ message: 'Switch account not found' });
        }
    } catch (error: any) {
        res.status(500).send({ message: error.message });
    }
});

// Delete a switch account
switchAccountsRouter.delete('/:switchaccounts_id', async (req: Request, res: Response) => {
    try {
        const switchAccount = await SwitchAccounts.findByPk(req.params.switchaccounts_id);
        if (switchAccount) {
            await switchAccount.destroy();
            res.status(200).send({ message: 'Switch account deleted successfully' });
        } else {
            res.status(404).send({ message: 'Switch account not found' });
        }
    } catch (error: any) {
        res.status(500).send({ message: error.message });
    }
});

export default switchAccountsRouter;
