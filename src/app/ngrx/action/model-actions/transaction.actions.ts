import {Action} from "@ngrx/store";
import {CREATE_TRANSACTION, PERSIST_TRANSACTION, REMOVE_TRANSACTION} from "../../reducer/reducer";
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

export class UpdateTransaction implements Action {
  readonly type: string;
  payload: Transaction;

  constructor(payload: Transaction){
    this.payload = payload;
  }
}

export class DeleteTransaction implements Action {
  readonly type: string;

}

export class GetTransaction implements Action {
  readonly type: string;

}

export class GetTransactionsByUser implements Action {
  readonly type: string;
}

export class PersistTransaction implements Action {
  readonly type: string = PERSIST_TRANSACTION;
  payload: Transaction;

  constructor (payload: Transaction){
    this.payload = payload;
  }
}

export class RemoveTransaction implements Action {
  readonly type: string = REMOVE_TRANSACTION;
  payload: number;

  constructor(payload: number){
    this.payload = payload;
  }
}

export class RefreshTransaction implements Action {
  readonly type: string;

}

export class FetchTransaction implements Action {
  readonly type: string;
}

export class FetchTransactionByUser implements Action {
  readonly type: string;

}
