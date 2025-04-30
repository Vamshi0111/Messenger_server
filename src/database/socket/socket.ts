import { Server as SocketIOServer, Socket } from 'socket.io';
import { Server as HttpServer } from 'http';
import Chat from '../model/chat';

let io: SocketIOServer;

const initializeSocket = (server: HttpServer): SocketIOServer => {
  io = new SocketIOServer(server, {
    cors: {
      origin: '*', // Adjust according to your CORS policy
    },
  });

  io.on('connection', (socket: Socket) => {
    console.log('New client connected', socket.id);

    socket.on('sendMessage', async (newMessage: any) => {
      try {
        const message = await Chat.create(newMessage);
        io.emit('receiveMessage', message);
      } catch (error) {
        console.error('Error saving message to database:', error);
      }
    });

    socket.on('disconnect', () => {
      console.log('Client disconnected', socket.id);
    });
  });

  return io;
};

const getSocketInstance = (): SocketIOServer => {
  if (!io) {
    throw new Error('Socket.io not initialized. Call initializeSocket first.');
  }
  return io;
};

export { initializeSocket, getSocketInstance };
