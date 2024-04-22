import { io } from "socket.io-client";

// "undefined" means the URL will be computed from the `window.location` object
const URL = "ws://127.0.0.1:5000/test";

export const socket = io(URL);
