import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {HomeARComponent} from './home-ar/home-ar.component';


const routes: Routes = [{
  path:"home",component:HomeComponent
},{path:"home-ar",component:HomeARComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
