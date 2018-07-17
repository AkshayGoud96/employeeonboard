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
import { SkillComponent } from './skill/skill.component';
import { TrainingComponent } from './training/training.component';
import { EmployerComponent } from './employer/employer.component';
import { CertificationsComponent } from './certifications/certifications.component';
import { InsuranceComponent } from './insurance/insurance.component';
import { MembershipsComponent } from './memberships/memberships.component';
import { AdditionaldetailsComponent } from './additionaldetails/additionaldetails.component';
import { SubmissionComponent } from './submission/submission.component';
import { CommonService } from 'src/app/services/commonservice.service';

const routes:Routes=[
  { path: '', redirectTo: '/Home', pathMatch: 'full' },
  {path:'Home',component:HomeComponent},
  {path:'Guidelines',component:GuidelinesComponent},
  {path:'Home/CreateProfile',component:CreateProfileComponent,
  children: [
    {path: '', redirectTo: 'personnel',pathMatch:'full'}, 
    {path: 'personnel', component:PersonnelComponent}, 
    {path: 'skills', component:SkillComponent}, 
    {path: 'trainings', component:TrainingComponent}, 
    {path: 'qualifications', component: QualificationComponent}, 
    {path: 'certifications', component: CertificationsComponent},
    {path: 'employers', component: EmployerComponent},  
    {path: 'memberships', component: MembershipsComponent},  
    {path: 'insurances', component: InsuranceComponent},
    {path: 'additional-details', component:AdditionaldetailsComponent},  
    {path: 'submission', component:SubmissionComponent},  
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
    QualificationComponent,
    SkillComponent,
    TrainingComponent,
    EmployerComponent,
    CertificationsComponent,
    InsuranceComponent,
    MembershipsComponent,
    AdditionaldetailsComponent,
    SubmissionComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes, {useHash: true}),
  ],
  providers: [OnboardingService,CommonService],
  bootstrap: [AppComponent]
})
export class AppModule { }
