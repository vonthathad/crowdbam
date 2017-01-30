import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { ChallengesComponent } from './components/challenges/challenges.component';
import { ChallengeComponent } from './components/challenge/challenge.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { ProfilesComponent } from './components/profiles/profiles.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';

const routes: Routes = [
    { path: '', component: HomeComponent, pathMatch: 'full' },

    { path: 'categories', component: ChallengesComponent },
    { path: 'categories/:name?sort=:type', component: ChallengesComponent },
    { path: 'recommendations?sort=:type', component: ChallengesComponent },
    { path: 'challenges/:id/:title', component: ChallengesComponent },

    { path: 'c/:url', component: ChallengeComponent },
    { path: 'challenges/:id/', component: ChallengeComponent },
    { path: 'challenges?sort=:type', component: ChallengeComponent },
    { path: 'challenges/:id/edit', component: ChallengeComponent },
    { path: 'challenges/create', component: ChallengeComponent },

    { path: 'profiles/:id', component: ProfilesComponent },
    { path: 'forgot-password', component: ForgotPasswordComponent },
];

export const routing = RouterModule.forRoot(routes);