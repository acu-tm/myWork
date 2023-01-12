import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// Services only provider Modules (!!! to be imported only once in application)
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from "./core/core.module";

import { MovieListComponent } from './movies-list/movie-list.component';
import { MovieMinDetailsComponent } from './movie-min-details/movie-min-details.component';
import { NavbarComponent } from './navbar/navbar.component';

import { FlexLayoutModule } from "@angular/flex-layout";
import {ReactiveFormsModule} from "@angular/forms";

import { MovieService } from "./core/services/movie.service";

// imports of child modules

//import for datepicker
import {MatDatepickerModule} from "@angular/material/datepicker";
import { MatNativeDateModule } from "@angular/material/core";
import { MatInputModule } from "@angular/material/input";
import {MatMomentDateModule, MomentDateModule} from "@angular/material-moment-adapter";

// imports for navigation bars (top and side)
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from "@angular/material/card";
import { MatGridListModule } from "@angular/material/grid-list";
import {FormsModule} from "@angular/forms";
import {HomepageComponent} from "./homepage/homepage.component";
import {MyDatepickerFormatDirective} from "./directives/my-datepicker-format.directive";
import {MyTestDirective} from "./directives/my-test.directive";

//


// purpose of a NgModule is to declare each thing you create in Angular and group them together (like Java packages)
@NgModule({
//“declarations” is for things you’ll use in your templates: mainly components
// (~ views: the classes displaying data), but also directives and pipes,
  // components are in local scope (private visibility) => re only usable in the current module
  declarations: [
    AppComponent,
    HomepageComponent,
    NavbarComponent,
    MovieListComponent,
    MovieMinDetailsComponent,
    MyDatepickerFormatDirective,
    MyTestDirective
  ],

  ///////////////////////////////////
  // If you need to use them outside, in other modules, you’ll have to export them:
  // exports: [SomeComponent, SomeDirective, SomePipe]
  ///////////////////////////////

  // if the module is imported for components, you’ll need to import it in each module needing them,
  // Module imported for services, need to import only once, in the first app module. Otherwise can lead to errors in advanced scenarios like lazy-loading
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        AppRoutingModule,
        FlexLayoutModule,
        ReactiveFormsModule,
        CoreModule,
      ReactiveFormsModule,
      MatDatepickerModule,
      MatNativeDateModule,
      MatInputModule,
      MatMomentDateModule,
      MomentDateModule,
      MatToolbarModule,
      MatSidenavModule,
      MatListModule,
      MatButtonModule,
      MatIconModule,
      MatCardModule,
      MatGridListModule
    ],
  // “providers” is for services (~ models: the classes getting and handling data)
  // Since Angular 6, services don’t need to be registered in a module anymore.
  // and is now limited to overriding existing services.
  // services you provided will generally be available/injectable anywhere in your app, in all modules.
  // Exception makes services from lazy loaded modules which have local scope only.
  providers: [
    MovieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
