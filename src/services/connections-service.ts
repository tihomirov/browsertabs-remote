import type {Peer as PeerType} from 'peerjs';
import Peer from 'react-native-peerjs';

import {Connection} from './connection'

interface IConnectionsService {
  createConnection(id: string): Connection;
}

class PeerConnectionsService implements IConnectionsService {
  private readonly _peer: PeerType;

  constructor() {
    this._peer = new Peer();
  }

  createConnection(peerId: string): Connection {
    return new Connection(this._peer, peerId)
  }
}

export const connectionsService: IConnectionsService = new PeerConnectionsService();
