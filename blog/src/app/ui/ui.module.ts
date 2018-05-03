// *****************************************************************************
// Imports
// *****************************************************************************

import { CommonModule }    from '@angular/common';
import { NgModule }        from '@angular/core';
import { RouterModule }    from '@angular/router';
import { HeaderComponent } from './structure/header/header.component';

// *****************************************************************************
// Locals
// *****************************************************************************

const arrImports: any[] = [
  CommonModule,
  RouterModule,
];

const arrDeclarations = [
  HeaderComponent,
];

const arrProviders: any[] = [
];

const arrExports: any[] = arrDeclarations;

// *****************************************************************************
// Class
// *****************************************************************************

/**
 * Module of the .
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
export class UiModule {}
// *****************************************************************************
