import {Observable} from "rxjs/Observable";
import {Account, Grouping, Transaction} from "../../model/model";
import * as _ from "lodash";
import {sampleAccount, sampleGrouping, sampleTransaction} from "./test.constant";

export class RepoMock {

  fetchAccount(identifier: number): Observable<Account> {
    let toReturn = _.cloneDeep(sampleAccount);
    toReturn.identifier = identifier;
    return Observable.of(toReturn);
  }

  createAccount(account: Account): Observable<Account> {
    return Observable.of(account);
  }

  updateAccount(account: Account): Observable<Account> {
    return Observable.of(account);
  }

  removeAccount(identifier: number): Observable<number> {
    return Observable.of(identifier);
  }

  fetchTransaction(identifier: number): Observable<Transaction> {
    let toReturn = _.cloneDeep(sampleTransaction);
    toReturn.identifier = identifier;
    return Observable.of(toReturn);
  }

  createTransaction(transaction: Transaction): Observable<Transaction> {
    return Observable.of(transaction);
  }

  updateTransaction(transaction: Transaction): Observable<Transaction> {
    return Observable.of(transaction);
  }

  removeTransaction(identifier: number): Observable<number> {
    return Observable.of(identifier);
  }

  fetchGrouping(identifier: number): Observable<Grouping> {
    let toReturn = _.cloneDeep(sampleGrouping);
    toReturn.identifier = identifier;
    return Observable.of(toReturn);
  }

  createGrouping(grouping: Grouping): Observable<Grouping> {
    return Observable.of(grouping);
  }

  updateGrouping(grouping: Grouping): Observable<Grouping> {
    return Observable.of(grouping);
  }

  removeGrouping(identifier: number): Observable<number> {
    return Observable.of(identifier);
  }

  fetchAll(): Observable<any> {
    return Observable.of({
      transactions: [sampleTransaction, _.cloneDeep(sampleTransaction)],
      accounts: [],
      groupings: [],
      equities: [],
      budgets: [],
      budgetPeriods: []
    });
  }
}
