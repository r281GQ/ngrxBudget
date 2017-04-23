import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {AppComponent} from './app.component';
import {combineReducers, StoreModule} from "@ngrx/store";
import {model, transactionFilter, user, reducer} from "./ngrx/reducer/reducer";
import {INITIAL_STATE} from "./ngrx/store/application-state";
import {reduce} from "rxjs/operator/reduce";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    StoreModule.provideStore(reducer, INITIAL_STATE)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
