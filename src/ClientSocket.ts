import WebSocket, { type Server } from "ws";
import { IncomingMessage } from "http";
import { v4 } from "uuid";

const CLIENT_SOCKET_PORT = 8989;

export interface ClientSocketType extends WebSocket {
  id: string;
}

type ClientMessageCallbackType = (message: any) => void;

type NewConnectionCallbackType = (ws: ClientSocketType) => void;

class ClientSocket {
  wss: Server<typeof WebSocket, typeof IncomingMessage>;
  clientMessageCallback: ClientMessageCallbackType;
  newClientCallback: NewConnectionCallbackType;

  constructor(
    newConnectionCallback: NewConnectionCallbackType,
    clientMessageCallback: ClientMessageCallbackType
  ) {
    this.newClientCallback = newConnectionCallback;
    this.clientMessageCallback = clientMessageCallback;

    this.wss = new WebSocket.Server({ port: CLIENT_SOCKET_PORT });

    // WebSocket connection handler
    this.wss.on("connection", (ws: ClientSocketType) => {
      console.log("Client connected");

      // Add a unique id to the connection
      ws.id = v4();
      // Call the new connection callback
      this.newClientCallback(ws);

      // Event handler for messages received from clients
      ws.on("message", (message) => {
        console.log(`Received: ${message}`);
        this.clientMessageCallback(message)
      });

      // Event handler for when the client closes the connection
      ws.on("close", () => {
        console.log("Client disconnected");
      });
    });

    console.log("WebSocket server listening on port" + CLIENT_SOCKET_PORT); // Replace with the actual port
  }

  // Returns all the ws connections
  getConnections() {
    return this.wss.clients;
  }
}

export default ClientSocket;
