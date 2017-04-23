import { Injectable } from '@angular/core';
import {Grouping, Transaction} from "../model/model";
import {Observable} from "rxjs/Observable";
import 'rxjs/add/observable/of';

@Injectable()
export class RepoService {

  constructor() { }

  createTransaction(transaction: Transaction): Observable <Transaction> {
    return Observable.of(transaction);
  }

  createTransaction2(transaction: Transaction): Observable <Transaction> {
    return Observable.of(transaction);
  }

  fetchGrouping(identifier: number): Observable <Grouping> {
    return Observable.of(null);
  }
}
