import {ConnectionsStore} from './connections-store';

export class RootStore {
	connectionsStore: ConnectionsStore;

	constructor() {
		this.connectionsStore = new ConnectionsStore();
	}
}
