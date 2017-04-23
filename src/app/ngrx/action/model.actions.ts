import {Action} from "@ngrx/store";
import {CREATE_ACCOUNT} from "../reducer/reducer";
/**
 * Created by veghe on 23/04/2017.
 */

export class CreateAccount implements Action {
  readonly type: string = CREATE_ACCOUNT;
  payload: {
    identifier: number,
    name: string,
    balance: number,
    currency: string
  };

  constructor(payload: {
    identifier: number,
    name: string,
    balance: number,
    currency: string
  }) {
    this.payload = payload;
  }
}
