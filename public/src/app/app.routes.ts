import { Routes, RouterModule } from '@angular/router';

import { AuthGuardService } from './services/auth-guard.service';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { ChallengesComponent } from './components/challenges/challenges.component';
import { ChallengeComponent } from './components/challenge/challenge.component';
import { ChallengeCreateComponent } from './components/challenge-create/challenge-create.component';
import { ChallengeEditComponent } from './components/challenge-edit/challenge-edit.component';
import { ChallengeOverviewComponent } from './components/challenge-overview/challenge-overview.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { ProfilesComponent } from './components/profiles/profiles.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';

const routes: Routes = [
    { path: '', component: HomeComponent, pathMatch: 'full' },

    { path: 'categories', component: ChallengesComponent },
    { path: 'categories/:name?sort=:type', component: ChallengesComponent },
    { path: 'recommendations?sort=:type', component: ChallengesComponent },

    { path: 'c/:url', component: ChallengeComponent },
    { path: 'challenges/:id', component: ChallengeComponent },
    { path: 'challenges?sort=:type', component: ChallengeComponent},
    { path: 'challenges/:id/edit', component: ChallengeEditComponent, canActivate: [AuthGuardService] },
    { path: 'challenge-create', component: ChallengeCreateComponent, canActivate: [AuthGuardService] },
    { path: 'challenges/:id/overview', component: ChallengeOverviewComponent},

    { path: 'profiles/:id', component: ProfilesComponent },
    { path: 'forgot-password', component: ForgotPasswordComponent },
];

export const routing = RouterModule.forRoot(routes);