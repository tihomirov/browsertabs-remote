import {ConnectionStore} from './connection-store';

export class RootStore {
	connectionStore: ConnectionStore;

	constructor() {
		this.connectionStore = new ConnectionStore();
	}
}
