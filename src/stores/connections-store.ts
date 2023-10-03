import {IDeviceConnection} from 'browsertabs-remote-common/src/device';
import {computed,makeObservable, observable, runInAction} from 'mobx';
import {Observable} from 'rxjs';

import {connectionsService} from '../services';
// import {ConnectionMock} from '../services/connection-mock';
import {TabInfo} from '../types';

export class ConnectionsStore {
  private readonly _connections: Map<string, IDeviceConnection> = observable.map();

  constructor() {
    makeObservable(this);

    // const connection = [
    //   new ConnectionMock('0001', {
    //     title: 'Google Перекладач',
    //     favIconUrl: 'https://ssl.gstatic.com/translate/favicon.ico'
    //   }),
    //   new ConnectionMock('0002', {
    //     title: 'tihomirov/browsertabs-remote-common',
    //     favIconUrl: 'https://github.githubassets.com/favicons/favicon-dark.png'
    //   }),
    //   new ConnectionMock('0003', {
    //     title: 'tihomirov/browsertabs-remote',
    //     favIconUrl: 'https://github.githubassets.com/favicons/favicon-dark.png'
    //   }),
    //   new ConnectionMock('0004', {
    //     title: 'Сімпсони - 5 сезон 6 серія дивитися онлайн українською',
    //     favIconUrl: 'https://simpsonsua.tv/templates/simpsonsua/images/favicon.ico'
    //   }),
    // ];

    // runInAction(() => {
    //   connection.forEach((c) =>  this._connections.set(c.peerId, c))
    // });

  }

  createConnection(peerId: string): void {
    const connection = connectionsService.createConnection(peerId);

    runInAction(() => {
      this._connections.set(peerId, connection);
    });
  }

  @computed
  get connectionIds(): ReadonlyArray<string> {
    return [...this._connections.keys()];
  }

  getConnection(peerId: string): IDeviceConnection | undefined {
    return this._connections.get(peerId);
  }

  getConnectionClose$(peerId: string): Observable<void> | undefined {
    return this._connections.get(peerId)?.close$;
  }

  getTabInfo$(peerId: string): Observable<TabInfo> | undefined {
    return this._connections.get(peerId)?.tabInfo$;
  }

  async closeConnection(peerId: string): Promise<void> {
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
