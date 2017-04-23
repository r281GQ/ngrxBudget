import {Action} from "@ngrx/store";
import {GROUPING_FETCH, UPDATE_GROUPING} from "../../reducer/reducer";
import {Grouping} from "../../../model/model";
/**
 * Created by veghe on 23/04/2017.
 */


export class GroupingFetch implements Action {
  type: string = GROUPING_FETCH;
  payload: any;

  constructor (id: number){
    this.payload = id;
  }

}

export class UpdateGrouping implements Action {
  type: string = UPDATE_GROUPING;
  payload: Grouping;

  constructor (grouping: Grouping){
    this.payload = grouping;
  }
}


