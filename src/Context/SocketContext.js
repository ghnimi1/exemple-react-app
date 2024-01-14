// import React, { createContext, useState, useEffect } from 'react'
// import io, { Socket } from 'socket.io-client';
// // import socket from '../Socket';

// const SocketContext = createContext();

// const ProvideContext = ({ children }) => {
//     // connecting to ouser server ::
//     const socket = io.connect('http://localhost:3001');
//     // user info :::
//     const [auth, setAuth] = useState({nom: 'mohammed'})
//     // chat arrey that we gonna display in the chat :::
//     const [chat, setChat] = useState([]);
//     // room id :::
//     const [roomId, setRoomId] = useState('');

//     useEffect(() => {
//       // listening on incomming messages ::
//       socket.on('message', ({name, message, time}) => {
//         setChat((chat) =>[ ...chat, { name, message, time } ]);
//         // console.log(chat);
//       })
//     }, [ chat ]);

//     // fn that send message ::
//     const sendMessage = ( message, time   ) => {
//       socket.emit('message', { roomId, name: auth.nom, message, time });
//     }

//     // fn that joins a room ::
//     const joinRoom = ( room ) => {
//       socket.emit('join_room', { roomId: room, userName: auth.nom});
//     }

//   return (
//     <SocketContext.Provider
//         value={{
//           socket,
//           chat,
//           roomId,
//           setRoomId,
//           sendMessage,
//           joinRoom,
//         }}
//     >
//         {children}
//     </SocketContext.Provider>
//   )
// }

// export  { SocketContext, ProvideContext }
