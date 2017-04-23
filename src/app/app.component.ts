import {Component} from '@angular/core';
import {Store} from "@ngrx/store";
import {ApplicationState} from "./ngrx/store/application-state";
import {QueryUpdate} from "./ngrx/action/transaction-filter.actions";
import {CreateAccount} from "./ngrx/action/model.actions";



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

  updateQuery(){
    this.store.dispatch(new QueryUpdate('salary'));
  }

  createAccount(){
    this.store.dispatch(new CreateAccount({identifier: 3, name: 'dfgdf', balance: 100, currency: 'GBP'}));
  }
}
