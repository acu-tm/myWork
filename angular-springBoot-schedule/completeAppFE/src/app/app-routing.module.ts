import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from "./homepage/homepage.component";
import { MovieListComponent } from './movies-list/movie-list.component';

const routes: Routes = [
   {path: '', redirectTo: 'homepage', pathMatch: 'full'},
   {path: 'homepage', component: HomepageComponent },
  // { path: 'courses-list', component: MovieListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

// Typical example of a mixed NgModule (Components + services) =>  forRoot(provide both Comp+Service) & forChild(provide only Comp) distinction
