import {Action, ActionType} from 'browsertabs-remote-common/src/common';
import {IDeviceConnection} from 'browsertabs-remote-common/src/device';
import type {DataConnection, PeerErrorType} from 'peerjs';
import {Observable, of,Subject} from 'rxjs';
import {delay} from 'rxjs/operators';

import {TabInfo} from '../types';

export class ConnectionMock implements IDeviceConnection {
  readonly open$: Observable<void>;
  readonly error$: Observable<{type: PeerErrorType}>;
  readonly close$: Observable<void>;
  readonly message$: Observable<unknown>;
  private readonly _connection: DataConnection;
  private readonly _unsubscribeSubject$ = new Subject<void>();

  constructor(readonly peerId: string, private readonly _mockTabInfo: TabInfo) {
  }

  get tabInfo$(): Observable<TabInfo> {
    return of(this._mockTabInfo).pipe(delay(5000));
  }

  get actions$(): Observable<ReadonlyArray<Action>> {
    return of([
      {
        type: ActionType.Reload,
      },
      {
        type: ActionType.IncreaseZoom,
      },
    ]);
  }

  dispose(): void {
    this._connection.close();
    this._unsubscribeSubject$.next();
    this._unsubscribeSubject$.complete();
  }

  sendAction(action: Action): void {
    this._connection.send(action);
  }
}
