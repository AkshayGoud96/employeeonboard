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
import { HomeComponent } from './home/home.component';
import { OnboardingService } from './services/onboarding.service';
import { HttpClientModule } from '@angular/common/http';

const routes:Routes=[
  { path: '', redirectTo: '/Home', pathMatch: 'full' },
  {path:'Home',component:HomeComponent},
  {path:'Guidelines',component:GuidelinesComponent},
  {path:'Home/CreateProfile',component:CreateProfileComponent},
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
    ViewProfileComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes, {useHash: true}),
  ],
  providers: [OnboardingService],
  bootstrap: [AppComponent]
})
export class AppModule { }
