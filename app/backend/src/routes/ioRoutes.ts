import { Socket } from 'socket.io';
import { SendMediaStreamController } from '../controllers/io/SendMediaStreamController';

const ioRoutes = (socket: Socket) => {
    console.log('A user connected');

    socket.on('sendMediaStream', (data) => (new SendMediaStreamController).execute(data, socket));

    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
};

export default ioRoutes;
