import type {Peer, DataConnection, PeerErrorType} from 'peerjs';
import {fromEventPattern, Observable, Subject} from 'rxjs';
import {filter, map, takeUntil, switchMap, tap} from 'rxjs/operators';

import {TabInfo} from '../types'
import {isSomething} from '../utils'

export class Connection {
  readonly open$: Observable<void>;  
  readonly error$: Observable<{type: PeerErrorType}>;
  readonly close$: Observable<void>;  
  readonly message$: Observable<unknown>;
  private readonly _connection: DataConnection;
  private readonly _unsubscribeSubject$ = new Subject<void>();

  constructor(private readonly _peer: Peer, peerId: string) {
    this._connection = this._peer.connect(peerId);
    
    this.open$ = fromEventPattern(
			handler => this._connection.on('open', handler),
			handler => this._connection.off('open', handler),
      () => undefined,
		).pipe(
      takeUntil(this._unsubscribeSubject$)
    );
    
    this.error$ = fromEventPattern(
			handler => this._connection.on('error', handler),
			handler => this._connection.off('error', handler),
      (data: {type: PeerErrorType}) => data,
		).pipe(
      takeUntil(this._unsubscribeSubject$)
    );
    
    this.close$ = fromEventPattern(
			handler => this._connection.on('close', handler),
			handler => this._connection.off('close', handler),
      () => undefined,
		).pipe(
      takeUntil(this._unsubscribeSubject$)
    );
    
    this.message$ = fromEventPattern(
			handler => this._connection.on('data', handler),
			handler => this._connection.off('data', handler),
		).pipe(
      takeUntil(this._unsubscribeSubject$),
			map((data) => data
				// tabMessageTypeguard(request)
				// 	? {...request, tabId: sender.tab?.id}
				// 	: undefined
			),
			filter(isSomething)
		);
  }

  get tabInfo$(): Observable<TabInfo> {
    return this.open$.pipe(
      tap((data) => console.log('LOG open$', data)),
      switchMap(() => {
        this._connection.send({
          type: 'HandshakeRequest'
        });

        return this.message$.pipe(
          tap((data) => console.log('LOG message$', data)),
          map(message => {
            // @ts-ignore
            if (message?.type === 'HandshakeResponse') {
              // @ts-ignore
              return message.tabInfo;
            }
          }),
          filter(isSomething)
        )
      })
    )
  }

  dispose(): void {
    this._connection.close();
    this._unsubscribeSubject$.next();
    this._unsubscribeSubject$.complete();
  }
}
