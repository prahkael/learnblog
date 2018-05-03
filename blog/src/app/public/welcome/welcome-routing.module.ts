// *****************************************************************************
// Imports
// *****************************************************************************

import { NgModule }          from '@angular/core';
import { RouterModule }      from '@angular/router';
import { Routes }            from '@angular/router';

import { WelcomeComponent }  from './welcome.component';
import { Post404Component }  from './404.component';
import { Post500Component }  from './500.component';

// *****************************************************************************
// Routes
// *****************************************************************************

const routes: Routes = [
  // component routes
  { path: '',
    component: WelcomeComponent, pathMatch: 'full' },

  // error routes
  { path: '500',
    component: Post500Component },
  { path: '**',
    component: Post404Component },
];

// *****************************************************************************
// Module
// *****************************************************************************

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class WelcomeRoutingModule {}

// *****************************************************************************
