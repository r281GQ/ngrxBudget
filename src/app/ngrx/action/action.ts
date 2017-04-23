import {Action} from "@ngrx/store";
import {UPDATEQUERY} from "../reducer/reducer";
/**
 * Created by veghe on 23/04/2017.
 */


export class QueryUpdate implements Action {
  readonly type: string;
  payload: string;

  constructor(payload: string) {
    this.type = UPDATEQUERY;
    this.payload = payload;
  }
}
