// *****************************************************************************
// Imports
// *****************************************************************************

import { BrowserModule }    from '@angular/platform-browser';
import { NgModule }         from '@angular/core';

// *****************************************************************************

import { AppRoutingModule } from './app-routing.module';

// *****************************************************************************

import { PublicModule }     from './public/public.module';
import { UiModule }         from './ui/ui.module';
import { AdminModule }      from './admin/admin.module';

// *****************************************************************************

import { AuthService }      from './public/auth/auth.service';

// *****************************************************************************

import { AppComponent }     from './app.component';

// *****************************************************************************
// Class
// *****************************************************************************

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    UiModule,
    AdminModule,
    PublicModule,
    AppRoutingModule,
  ],
  providers: [
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
