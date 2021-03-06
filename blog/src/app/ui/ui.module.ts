// *****************************************************************************
// Imports
// *****************************************************************************

import { CommonModule }    from '@angular/common';
import { NgModule }        from '@angular/core';
import { RouterModule }    from '@angular/router';

// *****************************************************************************

import { HeaderComponent } from './structure/header/header.component';

// *****************************************************************************

// import { NewLineToBrPipe } from './pipes/nl2br.pipe';

// *****************************************************************************
// Locals
// *****************************************************************************

const arrImports: any[] = [
  CommonModule,
  RouterModule,
];

const arrDeclarations = [
  HeaderComponent,
  // NewLineToBrPipe,
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
export class UiModule {}
// *****************************************************************************
