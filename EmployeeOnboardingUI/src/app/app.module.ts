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
import { PersonnelComponent } from './personnel/personnel.component';
import { QualificationComponent } from './qualification/qualification.component';

const routes:Routes=[
  { path: '', redirectTo: '/Home', pathMatch: 'full' },
  {path:'Home',component:HomeComponent},
  {path:'Guidelines',component:GuidelinesComponent},
  {path:'Home/CreateProfile',component:CreateProfileComponent,
  children: [
    {path: '', redirectTo: 'personnel',pathMatch:'full'}, 
    {path: 'personnel', component:PersonnelComponent}, 
    {path: 'qualification', component: QualificationComponent}, 
  ]},
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
    HomeComponent,
    PersonnelComponent,
    QualificationComponent
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
