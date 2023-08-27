import type {Peer as PeerType, DataConnection} from 'peerjs';
import Peer from 'react-native-peerjs';

interface IConnectionService {
  addTabConnection(id: string): Promise<DataConnection>;
  closeTabConnection(id: string): Promise<DataConnection>;
}

class PeerConnectionService implements IConnectionService {
  private readonly _peer: PeerType;
  private readonly _connections: Map<string, DataConnection> = new Map();

  constructor() {
    this._peer = new Peer();
  }

  addTabConnection(peerId: string): Promise<DataConnection> {
    return new Promise((resolve, reject) => {
      console.log('Peer connect ' + peerId); 
      const connection = this._peer.connect(peerId);
  
      this._connections.set(peerId, connection);

      connection.on('open', () => {
        console.log('Peer!!! open');
  
        let count = 0;
        connection.send('hi from Native App count:' + count++);
        setInterval(() => {
          connection.send('hi from Native App count:' + count++);
        }, 2000);

        resolve(connection);
      });
  
      connection.on('error', (error) => {
        reject(error);
      })
    })
  }

  closeTabConnection(peerId: string): Promise<DataConnection> {
    return new Promise((resolve, reject) => {
      const connection = this._connections.get(peerId);

      if (!connection) {
        return reject(new Error(`No connection with peer id:${peerId}`));
      }

      connection.on('close', () => {
        resolve(connection);
        this._connections.delete(peerId);
      });

      connection.close();
    })
  }
}

export const connectionService: IConnectionService = new PeerConnectionService();
