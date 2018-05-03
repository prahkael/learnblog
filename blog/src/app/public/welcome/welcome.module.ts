// *****************************************************************************
// Imports
// *****************************************************************************

import { CommonModule }         from '@angular/common';
import { NgModule }             from '@angular/core';

import { WelcomeRoutingModule } from './welcome-routing.module';

import { WelcomeComponent }     from './welcome.component';
import { Post404Component }     from './404.component';
import { Post500Component }     from './500.component';

// *****************************************************************************
// Locals
// *****************************************************************************

const arrImports = [
  CommonModule,
  WelcomeRoutingModule,
];

const arrDeclarations = [
  Post404Component,
  Post500Component,
  WelcomeComponent,
];

const arrProviders = [];

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
  declarations: arrDeclarations,
  providers   : arrProviders,
})
export class WelcomeModule {}

// *****************************************************************************
