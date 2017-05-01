import {Injectable} from "@angular/core";
import {Account, Budget, BudgetPeriod, Equity, Grouping, Transaction} from "../model/model";
import {Observable} from "rxjs/Observable";
import "rxjs/add/observable/of";
import "rxjs/add/observable/empty";
import {Http} from "@angular/http";

export interface RawDataBase {
  transactions: Transaction [],
  accounts: Account [],
  groupings: Grouping [],
  budgets: Budget [],
  budgetPeriods: BudgetPeriod [],
  equities: Equity []
}

@Injectable()
export class RepoService {

  constructor(private http: Http) {
  }

  fetchAccount(identifier: number): Observable<Account> {
    return null;
  }

  createAccount(account: Account): Observable<Account> {
    return null;
  }

  updateAccount(account: Account): Observable<Account> {
    return null;
  }

  removeAccount(identifier: number): Observable<number> {
    return null;
  }

  createTransaction(transaction: Transaction): Observable<Transaction> {
    return null;
  }

  fetchTransaction(identifier: number): Observable<Transaction> {
    return null;
  }

  updateTransaction(transaction: Transaction): Observable<Transaction> {
    return null;
  }

  removeTransaction(identifier: number): Observable<number> {
    return null;
  }

  fetchGrouping(identifier: number): Observable<Grouping> {
    return null;
  }

  createGrouping(grouping: Grouping): Observable<Grouping> {
    return null;
  }

  updateGrouping(grouping: Grouping): Observable<Grouping> {
    return null;
  }

  removeGrouping(identifier: number): Observable<number> {
    return null;
  }

  fetchEquity(identifier: number): Observable<Equity> {
    return null;
  }

  createEquity(equity: Equity): Observable<Equity> {
    return null;
  }

  updateEquity(equity: Equity): Observable<Equity> {
    return null;
  }

  removeEquity(identifier: number): Observable<number> {
    return null;
  }

  fetchBudget(identifier: number): Observable<Budget> {
    return null;
  }

  createBudget(budget: Budget): Observable<Budget> {
    return null;
  }

  updateBudget(budget: Budget): Observable<Budget> {
    return null;
  }

  removeBudget(identifier: number): Observable<number> {
    return null;
  }

  fetchBudgetPeriod(identifier: number): Observable<BudgetPeriod> {
    return Observable.of({
      identifier: 1,
      name: 'whatever',
      allowance: 100,
      balance: 40,
      currency: 'GBP',
      period: '02-17',
      budget: 1,
      transactions :  [1,2]
    });
  }

  // fetchBudgetPeriod(identifier: number): Observable<BudgetPeriod> {
  //   return null;
  // }

  updateBudgetPeriod(budgetPeriod: BudgetPeriod): Observable<BudgetPeriod> {
    return null;
  }

  fetchAll(): Observable<any> {
    return null;
  }
}
