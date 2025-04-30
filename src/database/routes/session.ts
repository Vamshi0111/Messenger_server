import express from 'express';
import Session from '../model/session';

const sessionRouter = express.Router();

// Route to create a session
sessionRouter.post('/', async (req, res) => {
  try {
    const { user_id, expires_at, session_token, data } = req.body;

    if (!user_id || !expires_at || !session_token) {
      return res.status(400).send({ message: 'User ID, expiration time, and session token are required' });
    }

    const session = await Session.create({ user_id, expires_at, session_token });
    res.status(200).send({ message: 'Session created successfully', data: session });
  } catch (error) {
    res.status(500).send({ message: `Error creating session: ${error}` });
  }
});

sessionRouter.get('/', async (req, res) => {
    try {
      const sessions = await Session.findAll();
      res.status(200).send({ message: 'Sessions fetched successfully', data: sessions });
    } catch (error) {
      res.status(500).send({ message: `Error fetching sessions: ${error}` });
    }
  });
// Route to fetch all sessions for a user
sessionRouter.get('/:user_id', async (req, res) => {
  try {
    const user_id = parseInt(req.params.user_id);
    const sessions = await Session.findAll({ where: { user_id } });
    res.status(200).send({ message: 'Sessions fetched successfully', data: sessions });
  } catch (error) {
    res.status(500).send({ message: `Error fetching sessions: ${error}` });
  }
});

// Route to delete a session
sessionRouter.delete('/:session_id', async (req, res) => {
  try {
    const session_id = req.params.session_id;
    await Session.destroy({ where: { session_id } });
    res.status(200).send({ message: 'Session deleted successfully' });
  } catch (error) {
    res.status(500).send({ message: `Error deleting session: ${error}` });
  }
});

export default sessionRouter;
