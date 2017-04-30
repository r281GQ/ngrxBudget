import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";

import {AppComponent} from "./app.component";
import {StoreModule} from "@ngrx/store";
import {reducer} from "./ngrx/reducer/reducer";
import {INITIAL_STATE} from "./ngrx/store/application-state";
import {ModelEffectService} from "./ngrx/effect/model-effect.service";
import {RepoService} from "./repo/repo.service";
import {EffectsModule} from "@ngrx/effects";
import {AuthEffectService} from "./ngrx/effect/auth-effect.service";
import {AuthService} from "./repo/auth.service";

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
    EffectsModule.run(ModelEffectService),
    EffectsModule.run(AuthEffectService)
  ],
  providers: [
    ModelEffectService,
    AuthEffectService,
    RepoService,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
