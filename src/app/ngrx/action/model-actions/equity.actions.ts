import {Action} from "@ngrx/store";
import {FETCH_EQUITY} from "../../reducer/reducer";
/**
 * Created by veghe on 24/04/2017.
 */


export class FetchEquity implements Action {
  readonly type: string = FETCH_EQUITY;
  payload: number;

  constructor (payload: number){
    this.payload = payload;
  }

}
