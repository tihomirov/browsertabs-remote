import {IDeviceConnection,PeerDeviceConnection} from 'browsertabs-remote-common/src/device';
import type {Peer as PeerType} from 'peerjs';
import Peer from 'react-native-peerjs';

class PeerConnectionsService {
  private readonly _peer: PeerType;
  private readonly _connections: Map<string, IDeviceConnection> = new Map();

  constructor() {
    this._peer = new Peer();
  }

  createConnection(peerId: string): IDeviceConnection {
    const connection = new PeerDeviceConnection(this._peer, peerId);

    this._connections.set(peerId, connection);

    return connection;
  }

  getConnection(peerId: string): IDeviceConnection | undefined {
    return this._connections.get(peerId);
  }
}

export const connectionsService = new PeerConnectionsService();
