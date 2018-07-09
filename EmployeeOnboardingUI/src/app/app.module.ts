import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import{RouterModule,Routes} from '@angular/router';
import { AppComponent } from './app.component';
import { OnboardingComponent } from './onboarding/onboarding.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { GuidelinesComponent } from './guidelines/guidelines.component';
import { CreateProfileComponent } from './create-profile/create-profile.component';
import { ViewProfileComponent } from './view-profile/view-profile.component';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

const routes:Routes=[
  { path: '', redirectTo: '/CreateProfile', pathMatch: 'full' },
  {path:'Guidelines',component:GuidelinesComponent},
  {path:'CreateProfile',component:CreateProfileComponent},
  {path:'ViewProfile',component:ViewProfileComponent},
 ];
@NgModule({
  declarations: [
    AppComponent,
    OnboardingComponent,
    HeaderComponent,
    FooterComponent,
    GuidelinesComponent,
    CreateProfileComponent,
    ViewProfileComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(routes, {useHash: true}),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
