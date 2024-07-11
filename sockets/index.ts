import { io, Socket  } from 'socket.io-client';

let socket: Socket | null = null;

const devDomain = 'localhost:3000';

export const connectSocket = ( userId: string, setNotifications: React.Dispatch<React.SetStateAction<any[]>> ) => {

    const domain = window.location.host === devDomain ? 'http://localhost:8000' : `${process.env.NEXT_PUBLIC_URL_DOMAIN}`

    socket = io(domain);

    socket.on('connect', () => {
        console.log('Connected to socket server');
    });

    socket.on('newCommentOnIssue', ( data: { message: any } ) => {
        setNotifications(prev => [data.message, ...prev]);
    })

    socket.on('newMessageSent', () => {
        //get Message Function
    })

    socket.emit('userConnected', userId);

};

export const disconnectSocket = () => {
    if (socket) {
        socket.disconnect();
        socket = null;
    }
}