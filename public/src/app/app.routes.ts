import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { SearchComponent } from './components/search/search.component';
import { RecommendationsComponent } from './components/recommendations/recommendations.component';
import { ChallengesComponent } from './components/challenges/challenges.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { ProfilesComponent } from './components/profiles/profiles.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';

const routes: Routes = [
    { path: '', component: HomeComponent, pathMatch: 'full' },
    { path: 'categories', component: SearchComponent },
    { path: 'categories/:name?sort=:type', component: SearchComponent },
    { path: 'recommendations?sort=:type', component: RecommendationsComponent },
    { path: 'challenges/:id/:title', component: ChallengesComponent },
    { path: 'c/:id/:title', component: ChallengesComponent },
    { path: 'challeges?sort=:type', component: ChallengesComponent },
    { path: 'challeges', component: ChallengesComponent },
    { path: 'profiles/:id', component: ProfilesComponent },
    { path: 'forgot-password', component: ForgotPasswordComponent },
];

export const routing = RouterModule.forRoot(routes);