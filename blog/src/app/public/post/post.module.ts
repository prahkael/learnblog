// *****************************************************************************
// Imports
// *****************************************************************************

import { CommonModule }           from '@angular/common';
import { NgModule }               from '@angular/core';
import { ReactiveFormsModule }    from '@angular/forms';
import { RouterModule }           from '@angular/router';
import { HttpClientModule }       from '@angular/common/http';

import { PostRoutingModule }      from './post-routing.module';

import { PostListComponent }      from './post-list.component';
import { PostDetailComponent }    from './post-detail.component';
import { PostService }            from './post.service';

import { NewLineToBrPipe }        from '../../ui/pipes/nl2br.pipe';

// *****************************************************************************
// Locals
// *****************************************************************************

const arrImports = [
  CommonModule,
  ReactiveFormsModule,
  PostRoutingModule,
  RouterModule,
  HttpClientModule,
];

const arrDeclarations = [
  PostListComponent,
  PostDetailComponent,
  NewLineToBrPipe,
];

const arrProviders = [
  PostService,
];

const arrExports = [
  PostListComponent,
  PostDetailComponent,
];

// *****************************************************************************
// Class
// *****************************************************************************

/**
 * Module of the blog module.
 *
 * @class
 * @author Thomas Fuchs <thomas.fuchs@net-designer.net>
 */
@NgModule({
  imports     : arrImports,
  exports     : arrExports,
  declarations: arrDeclarations,
  providers   : arrProviders,
})
export class PostModule {}

// *****************************************************************************
