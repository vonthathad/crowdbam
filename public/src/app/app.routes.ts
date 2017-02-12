import {Routes, RouterModule} from '@angular/router';

import {AuthGuardService} from './services/auth-guard.service';

import {AppComponent} from './app.component';
import {HomeComponent} from './components/home/home.component';
import {AdminComponent} from './components/admin/admin.component';
import {FilterChallengesComponent} from './components/filter-challenges/filter-challenges.component';

import {ChallengeComponent} from './components/challenge/challenge.component';
import {ChallengeWrapperComponent} from './components/challenge-wrapper/challenge-wrapper.component';
import {ChallengeCreateComponent} from './components/challenge-create/challenge-create.component';
import {ChallengeEditWrapperComponent} from './components/challenge-edit-wrapper/challenge-edit-wrapper.component';
import {NotificationsComponent} from './components/notifications/notifications.component';
import {ProfilesComponent} from './components/profiles/profiles.component';
import {ForgotPasswordComponent} from './components/forgot-password/forgot-password.component';

import {ChallengeEditBasicComponent} from './components/challenge-edit-basic/challenge-edit-basic.component';
import {ChallengeEditTimelineComponent} from './components/challenge-edit-timeline/challenge-edit-timeline.component';
import {ChallengeEditHtmlComponent} from './components/challenge-edit-html/challenge-edit-html.component';

import {ChallengeTimelineComponent} from './components/challenge-timeline/challenge-timeline.component';
import {ChallengeHtmlComponent} from './components/challenge-html/challenge-html.component';
import {ChallengeCommentsComponent} from './components/challenge-comments/challenge-comments.component';

import {ChallengeSolutionComponent} from './components/challenge-solution/challenge-solution.component';
import {ChallengeSolutionsComponent} from './components/challenge-solutions/challenge-solutions.component';
import {ChallengeSolutionEditComponent} from './components/challenge-solution-edit/challenge-solution-edit.component';
import {ChallengeSolutionCreateComponent} from './components/challenge-solution-create/challenge-solution-create.component';
import {FollowChallengesComponent} from "./components/follow-challenges/follow-challenges.component";
import {ProfileSettingsComponent} from "./components/profile-settings/profile-settings.component";

const routes: Routes = [
  {path: '', component: HomeComponent, pathMatch: 'full'},
  {path: 'admin', component: AdminComponent, pathMatch: 'full'},

  {path: 'categories/:name', component: FilterChallengesComponent},
  {path: 'recommendations', component: FilterChallengesComponent},
  {path: 'challenges', component: FilterChallengesComponent},
  {path: 'search', component: FilterChallengesComponent},
  {path: 'c/:url', component: ChallengeComponent},

  {
    path: 'admin', component: ChallengeSolutionsComponent,
  },

  // {
  //   path: 'challenges/:id/solutions', component: ChallengeSolutionsComponent,
  // },
  {
    path: 'challenges/:id/solutions/:sid', component: ChallengeSolutionComponent,
  },
  {
    path: 'challenges/:id/solution-create', component: ChallengeSolutionCreateComponent,
  },
  {
    path: 'challenges/:id/solutions/:sid/edit', component: ChallengeSolutionEditComponent,
  },


  {path: 'challenge-create', component: ChallengeCreateComponent},

  {
    path: 'challenges/:id/edit', component: ChallengeEditWrapperComponent,
    children: [
      {path: 'basic', redirectTo: '', pathMatch: 'full'},
      {path: '', component: ChallengeEditBasicComponent},
      {path: 'timeline', component: ChallengeEditTimelineComponent},
      {path: 'others/:type', component: ChallengeEditHtmlComponent},
    ]
  },
  {
    path: 'challenges/:id', component: ChallengeComponent,
    children: [
      {path: '', component: ChallengeHtmlComponent},
      {path: 'others/:type', component: ChallengeHtmlComponent},
      {path: 'timeline', component: ChallengeTimelineComponent},
      {path: 'comments', component: ChallengeCommentsComponent},
      {path: 'solutions', component: ChallengeSolutionsComponent},
    ]
  },
  {
    path: 'profiles/:id', component: ProfilesComponent,
    children: [
      {path: 'follows', component: FollowChallengesComponent},
      {path: 'challenges', component: FollowChallengesComponent},
      {path: 'settings', component: ProfileSettingsComponent}
    ]
  },
  {path: 'forgot-password', component: ForgotPasswordComponent},
];

export const routing = RouterModule.forRoot(routes);
