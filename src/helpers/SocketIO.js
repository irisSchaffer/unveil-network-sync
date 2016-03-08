import io from 'socket.io-client';

let socket = io('http://10.29.0.138:3000');
console.log(socket);

export default socket;