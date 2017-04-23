import {Action} from "@ngrx/store";
import {CREATE_TRANSACTION, PERSIST_TRANSACTION} from "../../reducer/reducer";
import {Transaction} from "../../../model/model";
/**
 * Created by veghe on 23/04/2017.
 */

export class CreateTransaction implements Action {
  readonly type: string = CREATE_TRANSACTION;
  payload: Transaction;

  constructor (payload: Transaction){
    this.payload = payload;
  }
}

export class PersistTransaction implements Action {
  readonly type: string = PERSIST_TRANSACTION;
  payload: Transaction;

  constructor (payload: Transaction){
    this.payload = payload;
  }
}
