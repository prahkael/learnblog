import { BrowserModule }    from '@angular/platform-browser';
import { NgModule }         from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { PostModule }       from './public/post/post.module';
import { WelcomeModule }    from './public/welcome/welcome.module';
import { UiModule }         from './ui/ui.module';

import { UserService }      from './public/user/user.service';

import { AppComponent }     from './app.component';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    UiModule,
    PostModule,
    WelcomeModule,
    AppRoutingModule,
  ],
  providers: [
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
