import ClientSocket from "./ClientSocket";
import { ClientSocketType } from "./ClientSocket";
import { JanusSocket } from "./JanusSocket";
import PushProxy from "./PushProxy";

const clients = new ClientSocket(newClientCallback, clientMessageCallback);
const janus = new JanusSocket(janusMessageCallback);
const proxy = new PushProxy();

function newClientCallback(ws: ClientSocketType) {
  const newJanusSocketId = janus.newSocket();

  console.log("new ws client");
  console.log(ws.id);
  console.log(newJanusSocketId);

  proxy.linkSockets(ws.id, newJanusSocketId);
}

function janusMessageCallback(message: any) {
  console.log("new janus message");
  console.log(message);
}

function clientMessageCallback(message: any) {
  console.log("new client message");
  console.log(message);
}

setInterval(() => {
  const clientsSet = clients.getConnections();
  clientsSet.forEach((client, i) => {
    const clientTyped = client as ClientSocketType;
    console.log(clientTyped.id);
  });
}, 1000);
