const express = require('express');
const friendRequestRouter = express.Router();
import users from "../model/users";
import FriendRequest from "../model/friendRequest";

// Fetch all friend requests
friendRequestRouter.get('/fetchfriend', async (req:any, res:any) => {
  try {
    const friendRequests = await FriendRequest.findAll({
      include: [
        { model: users, as: 'Sender', attributes: ['user_name'] },
        { model: users, as: 'Receiver', attributes: ['user_name'] },
      ],
    });
    res.json(friendRequests);
  } catch (error) {
    console.error('Error fetching friend requests:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

friendRequestRouter.delete('/delete/:requestId', async (req:any, res:any) => {
    try {
        const { requestId } = req.params;
        // Update the status to 'rejected' instead of deleting
        const [updated] = await FriendRequest.update(
            { status: 'rejected' },
            { where: { request_id: requestId } }
        );
        
        if (updated) {
            res.json({ message: 'Friend request rejected successfully' });
        } else {
            res.status(404).json({ error: 'Friend request not found' });
        }
    } catch (error) {
        console.error('Error rejecting friend request:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

export default friendRequestRouter;
