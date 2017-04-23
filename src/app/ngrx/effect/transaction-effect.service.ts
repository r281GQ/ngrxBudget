import {Injectable} from '@angular/core';
import {RepoService} from "../../repo/repo.service";
import {Actions, Effect} from "@ngrx/effects";
import {GROUPING_FETCH, PERSIST_TRANSACTION} from '../reducer/reducer';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/observable/from';

import {CreateTransaction} from "../action/model-actions/transaction.actions";
import {Observable} from "rxjs/Observable";
import {GroupingFetch, UpdateGrouping} from "../action/model-actions/grouping.actions";
import {Action} from "@ngrx/store";
import {FilterUpdate, QueryUpdate} from "../action/transaction-filter.actions";

@Injectable()
export class TransactionEffectService {

  constructor(private repoService: RepoService, private actions$: Actions) {
  }

  //
  // @Effect()
  // persistTransaction$ = this.actions$
  //   .ofType(PERSIST_TRANSACTION)
  //   // .do((action) => console.log(action.payload))
  //   .switchMap((action) => this.repoService.createTransaction(action.payload))
  //   .map(transaction =>  new CreateTransaction(transaction));

  // @Effect()
  // persistTransaction$ = this.actions$
  //   .ofType(PERSIST_TRANSACTION)
  //   // .do((action) => console.log(action.payload))
  //   .switchMap((action) => this.repoService.createTransaction(action.payload))
  //   .mergeMap(transaction =>  Observable.from([new CreateTransaction(transaction)]));

  @Effect()
  persistTransaction$ = this.actions$
    .ofType(PERSIST_TRANSACTION)
    // .do((action) => console.log(action.payload))
    .switchMap((action) => this.repoService.createTransaction(action.payload))
    // .switchMap(action => this.repoService.createTransaction(action.payload))
    .mergeMap(transaction => {

      return Observable.from([new CreateTransaction(transaction), new GroupingFetch(transaction.grouping)]);
    });

  @Effect()
  groupingFetch$ = this.actions$
    .ofType(GROUPING_FETCH)
    .do((action) => console.log('group call'))
    .switchMap((action) => this.repoService.fetchGrouping(action.payload))
    // .switchMap(action => this.repoService.createTransaction(action.payload))
    .map(grouping => new UpdateGrouping(grouping));


}
