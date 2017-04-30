import {Observable} from "rxjs/Observable";
import {Grouping, Transaction, Account} from "../../model/model";
import * as _ from 'lodash';
import {sampleTransaction, sampleGrouping, sampleAccount} from "./test.constant";

export class RepoMock {

  createTransaction(transaction: Transaction): Observable<Transaction> {
    return Observable.of(transaction);
  }

  fetchTransaction(identifier: number): Observable<Transaction> {
    let toReturn = _.cloneDeep(sampleTransaction);
    toReturn.identifier = identifier;
    return Observable.of(toReturn);
  }

  fetchGrouping(identifier: number): Observable<Grouping> {
    let toReturn = _.cloneDeep(sampleGrouping);
    toReturn.identifier = identifier;
    return Observable.of(toReturn);
  }

  fetchAccount(identifier: number): Observable<Account> {
    let toReturn = _.cloneDeep(sampleAccount);
    toReturn.identifier = identifier;
    return Observable.of(toReturn);
  }

  createAccount(account: Account): Observable<Account> {
    return Observable.of(account);
  }

  removeAccount(identifier: number): Observable<number> {
    return Observable.of(identifier);
  }

  updateAccount(account: Account): Observable<Account> {
    return Observable.of(account);
  }

  fetchAccountsByUser(): Observable<Account []> {
    return Observable.from([[]]);
  }

  updateTransaction(transaction: Transaction): Observable<Transaction> {
    return Observable.of(transaction);
  }

  updateGrouping(grouping: Grouping): Observable<Grouping> {
    return Observable.of(grouping);
  }

  fetchAll(): Observable<any> {
    return Observable.of({
      transactions: [sampleTransaction, _.cloneDeep(sampleTransaction)],
      accounts: []
    });
  }

  removeGrouping (identifier: number): Observable<number>{
    return Observable.of(identifier);
  }

  createGrouping(grouping: Grouping): Observable <Grouping>{
    return Observable.of(grouping);
  }

  removeTransaction(identifier: number): Observable <number>{
    return Observable.of(identifier);
  }
}
