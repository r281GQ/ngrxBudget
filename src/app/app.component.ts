import {Component} from "@angular/core";
import {Store} from "@ngrx/store";
import {ApplicationState} from "./ngrx/store/application-state";
import {QueryUpdate} from "./ngrx/action/transaction-filter.actions";
import {CreateAccount} from "./ngrx/action/model-actions/account.actions";
import {PersistTransaction} from "./ngrx/action/model-actions/transaction.actions";
import {FETCH_BUDGET_PERIOD} from "./ngrx/action/action.types";
import {go} from "@ngrx/router-store";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'app works!';

  constructor(private store: Store<ApplicationState>){
    store.subscribe(state => {
      console.log(state);
    });
  }

  budgetPeriodPersist(){
    this.store.dispatch({type: FETCH_BUDGET_PERIOD});
  }

  updateQuery(){
    this.store.dispatch(new QueryUpdate('salary'));
  }
  persist(){
    this.store.dispatch(new PersistTransaction({
      name: 'salary',
      currency: 'GBP',
      period: '03-2017',
      identifier: 1,
      account: 3,
      grouping: 4,
      amount: 55,
      creationDate: '12-03-2017',
      memo: ''
    }));
  }

  main(){
    this.store.dispatch(go(['/main']));
  }

  about(){
    this.store.dispatch(go(['/about']));
  }

  createAccount(){
    this.store.dispatch(new CreateAccount({identifier: 3, name: 'dfgdf', balance: 100, currency: 'GBP', transactions: []}));
  }
}
