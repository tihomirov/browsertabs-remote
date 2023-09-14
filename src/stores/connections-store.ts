import {makeObservable, observable, runInAction, computed} from 'mobx';
import {IDeviceConnection} from 'browsertabs-remote-common/src/device';
import {Observable} from 'rxjs';

import {connectionsService} from '../services';
import {TabInfo} from '../types';

export class ConnectionsStore {
  private readonly _connections: Map<string, IDeviceConnection> = observable.map();

  constructor() {
    makeObservable(this);

    // const connection = [
    //   new ConnectionMock({
    //     title: 'Google Перекладач',
    //     favIconUrl: 'https://ssl.gstatic.com/translate/favicon.ico'
    //   }),
    //   new ConnectionMock({
    //     title: 'tihomirov/browsertabs-remote-common',
    //     favIconUrl: 'https://github.githubassets.com/favicons/favicon-dark.png'
    //   }),
    //   new ConnectionMock({
    //     title: 'tihomirov/browsertabs-remote',
    //     favIconUrl: 'https://github.githubassets.com/favicons/favicon-dark.png'
    //   }),
    //   new ConnectionMock({
    //     title: 'Сімпсони - 5 сезон 6 серія дивитися онлайн українською',
    //     favIconUrl: 'https://simpsonsua.tv/templates/simpsonsua/images/favicon.ico'
    //   }),
    // ];

    // runInAction(() => {
    //   connection.forEach((c, index) =>  this._connections.set('12312312-' + index, c as unknown as Connection))
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
