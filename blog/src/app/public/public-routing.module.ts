// *****************************************************************************
// Imports
// *****************************************************************************

import { NgModule }          from '@angular/core';
import { RouterModule }      from '@angular/router';
import { Routes }            from '@angular/router';

// *****************************************************************************

import { WelcomeComponent }  from './welcome/welcome.component';
import { Post404Component }  from './welcome/404.component';
import { Post500Component }  from './welcome/500.component';

// *****************************************************************************

import { PostListComponent }   from './post/list/post-list.component';
import { PostViewComponent }   from './post/view/post-view.component';

// *****************************************************************************
// Routes
// *****************************************************************************

const routes: Routes = [
  // Welcome Component
  { path: '',
    component: WelcomeComponent,
    pathMatch: 'full' },

  // Post Component
  { path: 'posts',
    component: PostListComponent,
    pathMatch: 'full' },
  { path: 'posts/:id',
    component: PostViewComponent,
    pathMatch: 'full'},

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
export class PublicRoutingModule {}

// *****************************************************************************
