import {Component} from '@angular/core';
import {Store} from "@ngrx/store";
import {ApplicationState} from "./ngrx/store/application-state";
import {QueryUpdate} from "./ngrx/action/action";



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'app works!';

  constructor(private store: Store<ApplicationState>){

  }

  updateQuery(){
    this.store.dispatch(new QueryUpdate('salary'));
  }
}
