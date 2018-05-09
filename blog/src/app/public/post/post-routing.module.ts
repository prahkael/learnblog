// *****************************************************************************
// Imports
// *****************************************************************************

import { NgModule }            from '@angular/core';
import { RouterModule }        from '@angular/router';
import { Routes }              from '@angular/router';

import { PostListComponent }   from './post-list.component';
import { PostDetailComponent } from './post-detail.component';

// *****************************************************************************
// Routes
// *****************************************************************************

const routes: Routes = [
  { path: 'posts',     pathMatch: 'full', component: PostListComponent },
  { path: 'posts/new', pathMatch: 'full', component: PostDetailComponent },
  { path: 'posts/:id', pathMatch: 'full', component: PostDetailComponent },
];

// *****************************************************************************
// Module
// *****************************************************************************

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class PostRoutingModule {}

// *****************************************************************************
