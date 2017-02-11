import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { LocationStrategy, PathLocationStrategy, APP_BASE_HREF } from '@angular/common';
import { ModalModule } from 'angular2-modal';
import { BootstrapModalModule } from 'angular2-modal/plugins/bootstrap';
import { Ng2DatetimePickerModule } from 'ng2-datetime-picker';
import { FacebookService } from 'ng2-facebook-sdk';
import { routing } from './app.routes';

import { FroalaEditorDirective, FroalaViewDirective } from './directives/froala/froala.directive';

import { USER_PROVIDER } from './services/user.service';
import { CHALLENGE_PROVIDER } from './services/challenge.service';
import { CATEGORY_PROVIDER } from './services/category.service';
import { CUSTOM_VALIDATOR_PROVIDER } from './services/custom-validator.service';
import { FILE_VALIDATOR_PROVIDER } from './services/file-validator.service';
import { AUTH_GUARD_PROVIDER } from './services/auth-guard.service';
import { CONTENT_PROVIDER } from './services/content.service';
import { TYPE_PROVIDER } from './services/type.service';
import { HTML_PROVIDER } from './services/html.service';
import { ACTION_PROVIDER } from './services/action.service';
import {OrderByPipe} from './pipes/orderBy.pipe';
import {NotContainPipe} from './pipes/notContain.pipe';

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
import { ChallengeCreateComponent } from './components/challenge-create/challenge-create.component';
import { ValidatedUploadComponent } from './components-child/validated-upload/validated-upload.component';
// import { AutocompleteComponent } from './components-child/autocomplete/autocomplete.component';
import { ChallengeEditWrapperComponent } from './components/challenge-edit-wrapper/challenge-edit-wrapper.component';
import { ChallengeEditBasicComponent } from './components/challenge-edit-basic/challenge-edit-basic.component';
import { ChallengeEditHtmlComponent } from './components/challenge-edit-html/challenge-edit-html.component';
import { ChallengeEditTimelineComponent } from './components/challenge-edit-timeline/challenge-edit-timeline.component';
import { ChallengeEditNavigatorComponent } from './components-shared/challenge-edit-navigator/challenge-edit-navigator.component';
import { TimelineCardComponent } from './components-child/timeline-card/timeline-card.component';
import { FilterChallengesComponent } from './components/filter-challenges/filter-challenges.component';
import { ChallengeHtmlComponent } from './components/challenge-html/challenge-html.component';
import { ChallengeTimelineComponent } from './components/challenge-timeline/challenge-timeline.component';
import { ChallengeNavigatorComponent } from './components-shared/challenge-navigator/challenge-navigator.component';
import { ChallengeCommentsComponent } from './components/challenge-comments/challenge-comments.component';
import { ExploreModalComponent } from './components-child/explore-modal/explore-modal.component';

@NgModule({
  declarations: [
    OrderByPipe,
    NotContainPipe,
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
    ChallengeCreateComponent,
    ValidatedUploadComponent,
    // AutocompleteComponent,
    ChallengeEditWrapperComponent,
    ChallengeEditBasicComponent,
    ChallengeEditBasicComponent,
    ChallengeEditHtmlComponent,
    ChallengeEditTimelineComponent,
    ChallengeEditNavigatorComponent,
    TimelineCardComponent,
    FilterChallengesComponent,
    ChallengeHtmlComponent,
    ChallengeTimelineComponent,
    ChallengeNavigatorComponent,
    ChallengeCommentsComponent,
    ExploreModalComponent,
  ],
  entryComponents: [FormLoginWrapperComponent],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    routing,
    ModalModule.forRoot(),
    BootstrapModalModule,
    Ng2DatetimePickerModule
  ],
  providers: [
    USER_PROVIDER,
    CHALLENGE_PROVIDER,
    CATEGORY_PROVIDER,
    CUSTOM_VALIDATOR_PROVIDER,
    AUTH_GUARD_PROVIDER,
    FILE_VALIDATOR_PROVIDER,
    CONTENT_PROVIDER,
    TYPE_PROVIDER,
    HTML_PROVIDER,
    FacebookService,
    ACTION_PROVIDER,
    { provide: LocationStrategy, useClass: PathLocationStrategy },
    { provide: APP_BASE_HREF, useValue: '/' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
