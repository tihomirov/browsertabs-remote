import {IDeviceConnection,PeerDeviceConnection} from 'browsertabs-remote-common/src/device';
import type {Peer as PeerType} from 'peerjs';
import Peer from 'react-native-peerjs';

class PeerConnectionsService {
  private readonly _peer: PeerType;

  constructor() {
    this._peer = new Peer();
  }

  createConnection(peerId: string): IDeviceConnection {
    const connection = new PeerDeviceConnection(this._peer, peerId);
    return connection;
  }
}

export const connectionsService = new PeerConnectionsService();
