import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { LocationStrategy, PathLocationStrategy, APP_BASE_HREF } from '@angular/common';
import { ModalModule } from 'angular2-modal';
import { BootstrapModalModule } from 'angular2-modal/plugins/bootstrap';

import { routing } from './app.routes';

import {USER_PROVIDER} from './services/user.service';
import {CHALLENGE_PROVIDER} from './services/challenge.service';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { SearchComponent } from './components/search/search.component';
import { RecommendationsComponent } from './components/recommendations/recommendations.component';
import { ChallengesComponent } from './components/challenges/challenges.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { ProfilesComponent } from './components/profiles/profiles.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { HeaderComponent } from './components-shared/header/header.component';
import { FooterComponent } from './components-shared/footer/footer.component';
import { FormLoginComponent } from './components-child/form-login/form-login.component';
import { FormRegisterComponent } from './components-child/form-register/form-register.component';
import { FormLoginWrapperComponent } from './components-child/form-login-wrapper/form-login-wrapper.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { CardChallengeComponent } from './components-child/card-challenge/card-challenge.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SearchComponent,
    RecommendationsComponent,
    ChallengesComponent,
    NotificationsComponent,
    ProfilesComponent,
    CategoriesComponent,
    HeaderComponent,
    FooterComponent,
    FormLoginComponent,
    FormRegisterComponent,
    FormLoginWrapperComponent,
    ForgotPasswordComponent,
    CardChallengeComponent
  ],
  entryComponents: [FormLoginWrapperComponent],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    routing,
    ModalModule.forRoot(),
    BootstrapModalModule
  ],
  providers: [
    USER_PROVIDER,
    CHALLENGE_PROVIDER,
    { provide: LocationStrategy, useClass: PathLocationStrategy },
    { provide: APP_BASE_HREF, useValue: '/' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
