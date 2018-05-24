// *****************************************************************************
// Imports
// *****************************************************************************

import { CommonModule }           from '@angular/common';
import { NgModule }               from '@angular/core';
import { ReactiveFormsModule }    from '@angular/forms';
import { RouterModule }           from '@angular/router';
import { HttpClientModule }       from '@angular/common/http';

// *****************************************************************************

import { PostTableListComponent } from './post/table-list/post-table-list.component';
import { PostManageComponent }    from './post/manage/post-manage.component';

// *****************************************************************************

import { PostAdminService }       from './post/post-admin.service';
import { PostPublicService }      from '../public/post/post-public.service';

// *****************************************************************************

import { AdminRoutingModule }     from './admin-routing.module';

// *****************************************************************************
// Locals
// *****************************************************************************

const arrImports: any[] = [
  CommonModule,
  ReactiveFormsModule,
  RouterModule,
  HttpClientModule,
  AdminRoutingModule,
];
const arrDeclarations = [
  PostTableListComponent,
  PostManageComponent,
];
const arrProviders: any[] = [
  PostPublicService,
  PostAdminService
];
const arrExports: any[] = arrDeclarations;

// *****************************************************************************
// Class
// *****************************************************************************

@NgModule({
  imports     : arrImports,
  exports     : arrExports,
  declarations: arrDeclarations,
  providers   : arrProviders,
})
export class AdminModule {}
// *****************************************************************************
