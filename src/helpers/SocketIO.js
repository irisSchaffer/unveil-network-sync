import io from 'socket.io-client';

let socket = io('http://192.168.1.226:9000');
console.log(socket);

export default socket;