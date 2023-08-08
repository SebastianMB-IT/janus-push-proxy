class PushProxy {
  transactionsMap: {
    [transaction: string]: {
      clientSocketId: string;
      janusSocketId: string;
    };
  };
  clientJanusSocketsMap: Map<string, string>;

  constructor() {
    this.transactionsMap = {};
    this.clientJanusSocketsMap = new Map();
  }

  linkSockets(clientSocketId: string, janusSocketId: string): void {
    this.clientJanusSocketsMap.set(clientSocketId, janusSocketId);
  }
}

export default PushProxy;
