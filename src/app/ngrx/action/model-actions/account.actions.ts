import {Action} from "@ngrx/store";
import {CREATE_ACCOUNT, DELETE_ACCOUNT, UPDATE_ACCOUNT} from "../../reducer/reducer";
import {Account} from "../../../model/model";
/**
 * Created by veghe on 23/04/2017.
 */

export class CreateAccount implements Action {
  readonly type: string = CREATE_ACCOUNT;
  payload: Account;

  constructor(payload: Account) {
    this.payload = payload;
  }
}

export class UpdateAccount implements Action {
  readonly type: string = UPDATE_ACCOUNT;
  payload: {
    identifier: number,
    name: string,

  };

  constructor(payload: {
    identifier: number,
    name: string,
  }) {
    this.payload = payload;
  }
}

export class DeleteAccount implements Action {
  readonly type: string = DELETE_ACCOUNT;
  payload: number;

  constructor(payload: number ){
    this.payload = payload;
  }
}
