import { Routes, RouterModule } from '@angular/router';

import { AuthGuardService } from './services/auth-guard.service';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { ChallengesComponent } from './components/challenges/challenges.component';
import { FilterChallengesComponent } from './components/filter-challenges/filter-challenges.component';
import { ChallengeComponent } from './components/challenge/challenge.component';
import { ChallengeCreateComponent } from './components/challenge-create/challenge-create.component';
import { ChallengeEditWrapperComponent } from './components/challenge-edit-wrapper/challenge-edit-wrapper.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { ProfilesComponent } from './components/profiles/profiles.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';

import { ChallengeEditBasicComponent } from './components/challenge-edit-basic/challenge-edit-basic.component';
import { ChallengeEditTimelineComponent } from './components/challenge-edit-timeline/challenge-edit-timeline.component';
import { ChallengeEditHtmlComponent } from './components/challenge-edit-html/challenge-edit-html.component';

import { ChallengeTimelineComponent } from './components/challenge-timeline/challenge-timeline.component';
import { ChallengeHtmlComponent } from './components/challenge-html/challenge-html.component';
import { ChallengeCommentsComponent } from './components/challenge-comments/challenge-comments.component';

const routes: Routes = [
    { path: '', component: HomeComponent, pathMatch: 'full' },

    { path: 'categories/:name', component: FilterChallengesComponent },
    { path: 'recommendations', component: FilterChallengesComponent },
    { path: 'challenges', component: FilterChallengesComponent },
    { path: 'search', component: FilterChallengesComponent },
    { path: 'c/:url', component: ChallengeComponent },

    {
        path: 'challenges/:id', component: ChallengeComponent,
        children: [
            { path: '',  component: ChallengeHtmlComponent },
            { path: 'others/:type', component: ChallengeHtmlComponent },
            { path: 'timeline', component: ChallengeTimelineComponent },
            { path: 'comments', component: ChallengeCommentsComponent }
        ]
    },

    {
        path: 'challenges/:id/edit', component: ChallengeEditWrapperComponent,
        children: [
            // { path: 'basic', redirectTo: '', pathMatch: 'full' },
            { path: '', component: ChallengeEditBasicComponent },
            { path: 'timeline', component: ChallengeEditTimelineComponent },
            { path: 'others/:type', component: ChallengeEditHtmlComponent },
        ]
    },
    { path: 'challenge-create', component: ChallengeCreateComponent },
    { path: 'profiles/:id', component: ProfilesComponent },
    { path: 'forgot-password', component: ForgotPasswordComponent },
];

export const routing = RouterModule.forRoot(routes);
