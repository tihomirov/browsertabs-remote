import {makeObservable, observable, runInAction, computed} from 'mobx';

import { connectionsService, Connection } from '../services';

export class ConnectionsStore {
  private readonly _connections: Map<string, Connection> = observable.map();

  constructor() {
    makeObservable(this);
  }

  connection(peerId: string): void {
    const connection = connectionsService.createConnection(peerId);

    runInAction(() => {
      this._connections.set(peerId, connection);
		});
  }

  @computed
	get connections(): Array<[string, Connection]> {
		return [...this._connections.entries()];
	}

  async close(peerId: string): Promise<void> {
    runInAction(() => {
      this._connections.get(peerId)?.dispose();
      this._connections.delete(peerId);
		});
  }

  @computed
  get hasConnections(): boolean {
    return this._connections.size > 0;
  }
}
