// *****************************************************************************
// Imports
// *****************************************************************************

import { CommonModule }   from '@angular/common';
import { FormsModule }    from '@angular/forms';
import { NgModule }       from '@angular/core';

import { PostViewComponent } from './post/post-view.component';

// *****************************************************************************
// Locals
// *****************************************************************************

const arrImports: any[] = [
  CommonModule,
  FormsModule,
];
const arrDeclarations = [
  PostViewComponent,
];
const arrProviders: any[] = [
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
export class PrivateModule {}
// *****************************************************************************
