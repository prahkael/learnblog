// *****************************************************************************
// Imports
// *****************************************************************************

import { CommonModule }        from '@angular/common';
import { NgModule }            from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule }        from '@angular/router';
import { HttpClientModule }    from '@angular/common/http';

// *****************************************************************************

import { PublicRoutingModule } from './public-routing.module';

// *****************************************************************************

import { WelcomeComponent }    from './welcome/welcome.component';
import { Post404Component }    from './welcome/404.component';
import { Post500Component }    from './welcome/500.component';
import { PostListComponent }   from './post/list/post-list.component';
import { PostViewComponent }   from './post/view/post-view.component';

// *****************************************************************************

import { PostPublicService }   from './post/post-public.service';

// *****************************************************************************
// Locals
// *****************************************************************************

const arrImports = [
  CommonModule,
  ReactiveFormsModule,
  RouterModule,
  HttpClientModule,
  PublicRoutingModule
];

const arrDeclarations = [
  Post404Component,
  Post500Component,
  WelcomeComponent,
  PostListComponent,
  PostViewComponent,
];

const arrProviders = [
  PostPublicService
];

const arrExports = arrDeclarations;

// *****************************************************************************
// Class
// *****************************************************************************

@NgModule({
  imports     : arrImports,
  exports     : arrExports,
  declarations: arrDeclarations,
  providers   : arrProviders,
})
export class PublicModule {}

// *****************************************************************************
