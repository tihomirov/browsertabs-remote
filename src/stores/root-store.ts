import {ConnectionsStore} from './connections-store';
import {CurrentConnectionStore} from './current-connection-store';

export class RootStore {
  connectionsStore: ConnectionsStore;
  currentConnectionStore: CurrentConnectionStore;

  constructor() {
    this.connectionsStore = new ConnectionsStore();
    this.currentConnectionStore = new CurrentConnectionStore();
  }
}
