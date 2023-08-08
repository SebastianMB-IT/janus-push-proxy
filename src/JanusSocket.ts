import WebSocket from "ws";
import { v4 } from "uuid";
import { generateTransactionId } from "./utils";

type JanusMessageCallback = (message: any) => void;

export interface JanusSocketType extends WebSocket {
  id: string;
}

export class JanusSocket {
  sockets: JanusSocketType[] | null;
  janusMessageCallback: JanusMessageCallback;

  constructor(janusMessageCallback: JanusMessageCallback) {
    // Define variables
    this.sockets = [];
    this.janusMessageCallback = janusMessageCallback;
  }

  newSocket(): string {
    const ws = new WebSocket(
      "ws://localhost:8188",
      "janus-protocol"
    ) as JanusSocketType;

    // Add a unique id to the connection
    ws.id = v4();

    // Event handler for when the WebSocket connection is established
    ws.on("open", () => {
      console.log("Connected to server");
    });

    // Event handler for messages received from the server
    ws.on("message", (message: string) => {
      console.log(`Received from server: ${message}`);

      this.janusMessageCallback(message)
    });

    // Event handler for when the connection is closed
    ws.on("close", () => {
      console.log("Connection closed");
    });

    // Push to sockets list
    this.sockets?.push(ws);

    return ws.id;
  }
}
