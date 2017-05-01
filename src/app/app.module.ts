import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";

import {AppComponent} from "./app.component";
import {StoreModule} from "@ngrx/store";
import {StoreDevtools, StoreDevtoolsModule} from "@ngrx/store-devtools"
import {reducer} from "./ngrx/reducer/reducer";
import {INITIAL_STATE} from "./ngrx/store/application-state";
import {ModelEffectService} from "./ngrx/effect/model-effect.service";
import {RepoService} from "./repo/repo.service";
import {EffectsModule} from "@ngrx/effects";
import {AuthEffectService} from "./ngrx/effect/auth-effect.service";
import {AuthService} from "./repo/auth.service";
import {RouterModule} from "@angular/router";
import {routes} from "./routes";
import {RouterStoreModule} from "@ngrx/router-store";
import { MainComponent } from './component/main/main.component';
import { AboutComponent } from './component/about/about.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    AboutComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    StoreModule.provideStore(reducer, INITIAL_STATE),
    EffectsModule.run(ModelEffectService),
    EffectsModule.run(AuthEffectService),
    StoreDevtoolsModule.instrumentOnlyWithExtension(),
    RouterStoreModule.connectRouter()
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
