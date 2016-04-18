import io from 'socket.io-client';

let socket
const createSocket = function(ip) {
	if (!socket) {
		socket = io(ip)
	}

	return socket
}

export default createSocket;
