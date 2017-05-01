import {Route} from "@angular/router";
import {MainComponent} from "./component/main/main.component";
import {AboutComponent} from "./component/about/about.component";
const routes: Route [] = [
  {path: 'main', component: MainComponent},
  {path: 'about', component: AboutComponent}
];

export {routes};
