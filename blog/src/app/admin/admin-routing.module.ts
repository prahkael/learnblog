// *****************************************************************************
// Imports
// *****************************************************************************

import { NgModule }          from '@angular/core';
import { RouterModule }      from '@angular/router';
import { Routes }            from '@angular/router';

// *****************************************************************************

import { PostTableListComponent } from './post/table-list/post-table-list.component';
import { PostManageComponent }    from './post/manage/post-manage.component';

// *****************************************************************************
// Routes
// *****************************************************************************

const routes: Routes = [
  // Post Component
  { path: 'admin/posts',     pathMatch: 'full', component: PostTableListComponent },
  { path: 'admin/posts/:id', pathMatch: 'full', component: PostManageComponent},
];

// *****************************************************************************
// Module
// *****************************************************************************

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class AdminRoutingModule {}

// *****************************************************************************
