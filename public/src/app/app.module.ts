import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { LocationStrategy, PathLocationStrategy, APP_BASE_HREF } from '@angular/common';
import { ModalModule } from 'angular2-modal';
import { BootstrapModalModule } from 'angular2-modal/plugins/bootstrap';

import { routing } from './app.routes';

import { FroalaEditorDirective, FroalaViewDirective } from './directives/froala/froala.directive';

import { USER_PROVIDER } from './services/user.service';
import { CHALLENGE_PROVIDER } from './services/challenge.service';
import { CATEGORY_PROVIDER } from './services/category.service';
import { CUSTOM_VALIDATOR_PROVIDER } from './services/custom-validator.service';
import { FILE_VALIDATOR_PROVIDER } from './services/file-validator.service';
import { AUTH_GUARD_PROVIDER } from './services/auth-guard.service';


import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { ChallengesComponent } from './components/challenges/challenges.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { ProfilesComponent } from './components/profiles/profiles.component';
import { HeaderComponent } from './components-shared/header/header.component';
import { FooterComponent } from './components-shared/footer/footer.component';
import { FormLoginComponent } from './components-child/form-login/form-login.component';
import { FormRegisterComponent } from './components-child/form-register/form-register.component';
import { FormLoginWrapperComponent } from './components-child/form-login-wrapper/form-login-wrapper.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { CardChallengeComponent } from './components-child/card-challenge/card-challenge.component';
import { ChallengeComponent } from './components/challenge/challenge.component';
import { ValidatedMulticheckboxComponent } from './components-child/validated-multicheckbox/validated-multicheckbox.component';
import { ChallengeOverviewComponent } from './components/challenge-overview/challenge-overview.component';
import { ChallengeCreateComponent } from './components/challenge-create/challenge-create.component';
import { ChallengeEditComponent } from './components/challenge-edit/challenge-edit.component';
import { ValidatedUploadComponent } from './components-child/validated-upload/validated-upload.component';

@NgModule({
  declarations: [
    AppComponent,
    FroalaEditorDirective, 
    FroalaViewDirective,
    HomeComponent,
    ChallengesComponent,
    NotificationsComponent,
    ProfilesComponent,
    HeaderComponent,
    FooterComponent,
    FormLoginComponent,
    FormRegisterComponent,
    FormLoginWrapperComponent,
    ForgotPasswordComponent,
    CardChallengeComponent,
    ChallengeComponent,
    ValidatedMulticheckboxComponent,
    ChallengeOverviewComponent,
    ChallengeCreateComponent,
    ChallengeEditComponent,
    ValidatedUploadComponent,
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
    CATEGORY_PROVIDER,
    CUSTOM_VALIDATOR_PROVIDER,
    AUTH_GUARD_PROVIDER,
    FILE_VALIDATOR_PROVIDER,
    { provide: LocationStrategy, useClass: PathLocationStrategy },
    { provide: APP_BASE_HREF, useValue: '/' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
