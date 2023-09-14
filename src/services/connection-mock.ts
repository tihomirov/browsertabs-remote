import type {DataConnection, PeerErrorType} from 'peerjs';
import {Observable, Subject, of} from 'rxjs';
import {delay} from 'rxjs/operators';

import {TabInfo} from '../types';

export class ConnectionMock {
  readonly open$: Observable<void>;  
  readonly error$: Observable<{type: PeerErrorType}>;
  readonly close$: Observable<void>;  
  readonly message$: Observable<unknown>;
  private readonly _connection: DataConnection;
  private readonly _unsubscribeSubject$ = new Subject<void>();

  constructor(private readonly _mockTabInfo: TabInfo) {
  }

  get tabInfo$(): Observable<TabInfo> {
    return of(this._mockTabInfo).pipe(delay(5000))
  }

  dispose(): void {
    this._connection.close();
    this._unsubscribeSubject$.next();
    this._unsubscribeSubject$.complete();
  }
}
