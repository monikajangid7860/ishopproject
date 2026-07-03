import { io } from "socket.io-client";

let socket = null;

export function initAdminSocket() {
  if (!socket) {
    socket = io("http://localhost:5000", {
      withCredentials: true,
      transports: ["websocket"],
    });
  }
  return socket;
}

// OPTIONAL: only if you really need it somewhere else
export function getAdminSocket() {
  return socket;
}
