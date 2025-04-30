import { Router, Request, Response } from 'express';
import VipMembership from '../model/vip_membership'; 

const VipMembershipRouter = Router();

VipMembershipRouter.post('/', async (req: Request, res: Response) => {
    try {
        const reqData = req.body;
        
        const { user_id, status, start_date, end_date, vip_membership_level, benefits } = reqData;

        if (!user_id) {
            return res.status(400).send({ message: "Please enter user ID" });
        }
        if (!status) {
            return res.status(400).send({ message: "Please enter status" });
        }
        if (!start_date) {
            return res.status(400).send({ message: "Please enter start date" });
        }
        if (!end_date) {
            return res.status(400).send({ message: "Please enter end date" });
        }
        if (!vip_membership_level) {
            return res.status(400).send({ message: "Please enter VIP membership level" });
        }
        if (!benefits) {
            return res.status(400).send({ message: "Please enter benefits" });
        }

        const createVipMembershipObject: any = {
            user_id,
            status,
            start_date,
            end_date,
            vip_membership_level,
            benefits,
        };

        const createVipMembership = await VipMembership.create(createVipMembershipObject);
        res.status(200).send({
            message: "VIP Membership created successfully",
            DataTransfer: createVipMembership,
        });
    } catch (error: any) {
        return res.status(500).send({ messageError: `Error submitting details: ${error.message}` });
    }
});

VipMembershipRouter.get('/', async (req: Request, res: Response) => {
    try {
        const responseVipMembershipsData = await VipMembership.findAll();
        res.send({ message: "Data fetched successfully", data: responseVipMembershipsData });
    } catch (error: any) {
        res.send({ message: error.message });
    }
});

VipMembershipRouter.post('/update', async (req: Request, res: Response) => {
    try {
        const response = await VipMembership.update(req.body, { where: { vip_id: req.body.vip_id } });
        res.send({ message: 'Column updated successfully' });
    } catch (error: any) {
        res.send({ message: error.message });
    }
});

VipMembershipRouter.patch('/:vip_id', async (req: Request, res: Response) => {
    try {
        const response = await VipMembership.update({  }, { where: { vip_id: parseInt(req.params.vip_id) } });
        res.send({ message: 'Successfully marked as active' });
    } catch (error: any) {
        res.send({ message: error.message });
    }
});

VipMembershipRouter.get('/:vip_id', async (req: Request, res: Response) => {
    const { vip_id } = req.params;
    try {
        const vipMembership = await VipMembership.findByPk(vip_id);
        if (vipMembership) {
            res.status(200).json(vipMembership);
        } else {
            res.status(404).json({ message: 'VIP membership not found' });
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

VipMembershipRouter.delete('/:vip_id', async (req: Request, res: Response) => {
    const { vip_id } = req.params;
    try {
        const deleted = await VipMembership.destroy({ where: { vip_id } });
        if (deleted) {
            res.status(204).json({ message: 'VIP membership deleted' });
        } else {
            res.status(404).json({ message: 'VIP membership not found' });
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

export default VipMembershipRouter;
