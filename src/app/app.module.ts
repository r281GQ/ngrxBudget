import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import {StoreModule} from "@ngrx/store";
import {transactionFilterReducer} from "./ngrx/reducer/reducer";
import {INITIAL_STATE} from "./ngrx/store/application-state";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    StoreModule.provideStore(transactionFilterReducer, INITIAL_STATE)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
