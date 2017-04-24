import {Action} from "@ngrx/store";
import {FETCH_GROUPING, UPDATE_GROUPING} from "../../reducer/reducer";
import {Grouping} from "../../../model/model";
/**
 * Created by veghe on 23/04/2017.
 */


export class FetchGrouping implements Action {
  type: string = FETCH_GROUPING;
  payload: number;

  constructor (payload: number){
    this.payload = payload;
  }

}

export class UpdateGrouping implements Action {
  type: string = UPDATE_GROUPING;
  payload: Grouping;

  constructor (grouping: Grouping){
    this.payload = grouping;
  }
}


