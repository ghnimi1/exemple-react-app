import React, { createContext, useState, useEffect } from "react";
import socket from "../socket";

const SocketContext = createContext();

const ProvideContext = ({ children }) => {
  const [chat, setChat] = useState([]);
  useEffect(() => {
    // listening on incomming messages ::
    socket.on("FE-receive-message", ({ msg, sender, time, pdf }) => {
      setChat((chat) => [...chat, { msg, sender, time, pdf }]);
      // console.log(chat);
    });
  }, [socket]);

  return (
    <SocketContext.Provider value={{ chat }}>{children}</SocketContext.Provider>
  );
};
export { SocketContext, ProvideContext };
