import {Injectable} from '@angular/core';
import {RepoService} from "../../repo/repo.service";
import {Actions, Effect} from "@ngrx/effects";
import {
  FETCH_ACCOUNT, FETCH_ALL, FETCH_GROUPING, PERSIST_ACCOUNT, PERSIST_GROUPING,
  PERSIST_TRANSACTION,
  REFRESH_ACCOUNT, REFRESH_GROUPING, REFRESH_TRANSACTION,
  REMOVE_ACCOUNT, REMOVE_GROUPING, REMOVE_TRANSACTION
} from '../reducer/reducer';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/merge';
import * as _ from 'lodash';

import {CreateTransaction} from "../action/model-actions/transaction.actions";
import {Observable} from "rxjs/Observable";
import {UpdateGrouping, CreateGrouping} from "../action/model-actions/grouping.actions";
import {
  CreateAccount, FetchAccount,
  UpdateAccount
} from "../action/model-actions/account.actions";
import {Action} from "@ngrx/store";
import {FetchEquity} from "../action/model-actions/equity.actions";
import {FetchAll, UpdateAll} from "../action/model-actions/misc.actions";
var uuid = require('uuid/v4');

@Injectable()
export class TransactionEffectService {
  constructor(private repoService: RepoService, private actions$: Actions) {
  }

  removeTransaction$ = this.actions$
    .ofType(REMOVE_TRANSACTION)
    .switchMap(action => this.repoService.removeTransaction(action.payload))
    .map(()=> new FetchAll());


  @Effect()
  refreshTransaction = this.actions$
    .ofType(REFRESH_TRANSACTION)
    .switchMap((action) => this.repoService.updateTransaction(action.payload))
    .map(() => new FetchAll());

  /*
   Calling the backend to persist the transaction. If it was successful than it dispatches at least 3 actions:
   - one to create the transaction in store
   - one to fetch the updated account from the backend (which will trigger a memory account update chaining effect later)
   - one to update the grouping in store
   Besides these if the transaction has budget or/and equity these update actions will be dispatched as well.
   */
  @Effect()
  persistTransaction$ = this.actions$
    .ofType(PERSIST_TRANSACTION)
    .map(action => {
      action.payload.identifier = uuid();
      return action;
    })
    .switchMap(action => this.repoService.createTransaction(action.payload))
    .mergeMap(transaction => {

      let array: Action [] = [];

      array.push(new CreateTransaction(transaction));
      array.push(new FetchAccount(transaction.account));

      if (transaction.budget !== undefined)
        array.push(new FetchEquity(transaction.equity));

      if (transaction.equity !== undefined)
        array.push(new FetchEquity(transaction.equity));

      return Observable.from(array);
    });

  /*
   Calling the backend to get the grouping with the id, and then dispatches an action to update the corresponding resource in the store.
   */
  @Effect()
  groupingFetch$ = this.actions$
    .ofType(FETCH_GROUPING)
    .switchMap((action) => this.repoService.fetchGrouping(action.payload))
    .map(grouping => new UpdateGrouping(grouping));

  @Effect()
  groupingRefresh$ = this.actions$
    .ofType(REFRESH_GROUPING)
    .switchMap((action) => this.repoService.updateGrouping(action.payload))
    .map(grouping => new UpdateGrouping(grouping));

  groupingRemoval$ = this.actions$
    .ofType(REMOVE_GROUPING)
    .switchMap(action => this.repoService.removeGrouping(action.payload))
    .map(() => new FetchAll());

  groupingPersist$ = this.actions$
    .ofType(PERSIST_GROUPING)
    .map(action => {
      action.payload.identifier = uuid();
      return action;
    })
    .switchMap(action => this.repoService.createGrouping(action.payload))
    .map(grouping => new CreateGrouping(grouping));


  /*
   Calling th backend to get the account with the id, and then dispatches an action to update the corresponding resource in the store.
   */
  @Effect()
  accountFetch$ = this.actions$
    .ofType(FETCH_ACCOUNT)
    .switchMap((action) => this.repoService.fetchAccount(action.payload))
    .map(account => new UpdateAccount(account));

  @Effect()
  removeAccount$ = this.actions$
    .ofType(REMOVE_ACCOUNT)
    .switchMap(action => this.repoService.removeAccount(action.payload))
    .map(() => new FetchAll());

  @Effect()
  accountPersist$ = this.actions$
    .ofType(PERSIST_ACCOUNT)
    .map(action => {
      action.payload.identifier = uuid();
      return action;
    })
    .switchMap(action => this.repoService.createAccount(action.payload))
    .map(account => new CreateAccount(account));

  @Effect()
  accountRefresh$ = this.actions$
    .ofType(REFRESH_ACCOUNT)
    .switchMap((action) => this.repoService.updateAccount(action.payload))
    .map(account => new UpdateAccount(account));

  // @Effect()
  // accountsFetchByUser$ = this.actions$
  //   .ofType(FETCH_ACCOUNTS_BY_USER)
  //   .switchMap(() => this.repoService.fetchAccountsByUser())
  //   .map(() => new GetAccountsByUser());


  @Effect()
  fetchAll$ = this.actions$
    .ofType(FETCH_ALL)
    .switchMap(() => this.repoService.fetchAll())
    .map(db => new UpdateAll(db));


}
