import express from 'express';
import users from '../model/users'; 
import FriendRequest from '../model/friendRequest';  

const AddfriendRouter = express.Router();

AddfriendRouter.get('/username', async (req, res) => {
  try {
    const { user_name } = req.query;

    if (!user_name || typeof user_name !== 'string') {
      return res.status(400).send({ message: "user_name parameter is required and must be a string" });
    }
    
    const responseUsersData = await users.findAll({
      where: {
        user_name: user_name
      }
    });

    if (responseUsersData.length === 0) {
      return res.status(404).send({ message: "User not found ⚠️" });
    }

    const modifiedResponseData = responseUsersData.map((item) => ({
      user_id: item.user_id,
      user_name: item.user_name,
      name: item.name,
      date_of_birth: item.date_of_birth,
      profile_picture_url: item.profile_picture_url,
      phone: item.phone,
      email: item.email,
    }));

    res.send({ message: "Data fetched successfully", data: modifiedResponseData });

  } catch (error:any) {
    console.error(error); 
    res.status(500).send({ message: error.message });
  }
});

AddfriendRouter.post('/send-request', async (req, res) => {
  try {
    const { sender_id, user_name } = req.body;

    if (!sender_id || !user_name || typeof user_name !== 'string') {
      return res.status(400).send({ message: "sender_id and user_name parameters are required and user_name must be a string" });
    }
    
    const receiverData = await users.findOne({
      where: {
        user_name: user_name
      }
    });

    if (!receiverData) {
      return res.status(404).send({ message: "User not found ⚠️" });
    }

    const receiver_id = receiverData.user_id;

    const newRequest = await FriendRequest.create({
      sender_id: sender_id,
      receiver_id: receiver_id,
      status: 'pending'
    });

    res.send({ message: "Friend request sent successfully", data: newRequest });

  } catch (error:any) {
    console.error(error);
    res.status(500).send({ message: error.message });
  }
});

export default AddfriendRouter;
