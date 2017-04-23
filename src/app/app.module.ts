import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {AppComponent} from './app.component';
import {combineReducers, StoreModule} from "@ngrx/store";
import {model, transactionFilter, reducer} from "./ngrx/reducer/reducer";
import {INITIAL_STATE} from "./ngrx/store/application-state";
import {reduce} from "rxjs/operator/reduce";
import {TransactionEffectService} from "./ngrx/effect/transaction-effect.service";
import {RepoService} from "./repo/repo.service";
import {EffectsModule} from "@ngrx/effects";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    StoreModule.provideStore(reducer, INITIAL_STATE),
    EffectsModule.run(TransactionEffectService)
  ],
  providers: [
    TransactionEffectService,
    RepoService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
