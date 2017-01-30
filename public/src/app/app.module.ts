import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { LocationStrategy, PathLocationStrategy, APP_BASE_HREF } from '@angular/common';


import { routing } from './app.routes';

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
    FooterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing
  ],
  providers: [
    { provide: LocationStrategy, useClass: PathLocationStrategy },
    { provide: APP_BASE_HREF, useValue: '/' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
