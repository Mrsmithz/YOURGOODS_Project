import SocketIO from 'socket.io-client'

const Socket = SocketIO("http://localhost:25800/contacts", {
  withCredentials: true,
});

export default Socket