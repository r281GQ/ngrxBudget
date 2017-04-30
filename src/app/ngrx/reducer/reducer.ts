import {ApplicationState, INITIAL_STATE} from "../store/application-state";
import {Action} from "@ngrx/store";
import {transactionFilter} from "./transaction-filter-reducer";
import {model} from "./model.reducer";
import {auth} from "./auth.reducer";

export function reducer (state: ApplicationState = INITIAL_STATE, action: Action) {
  return {
    auth: auth(state.auth, action),
    transactionFilter: transactionFilter(state.transactionFilter, action),
    model: model(state.model, action),
  }
}
