import { Component, OnInit } from '@angular/core';
import { OnboardingService } from '../services/onboarding.service';
import { UserProfile } from '../UserProfile';

@Component({
  selector: 'app-create-profile',
  templateUrl: './create-profile.component.html',
  styleUrls: ['./create-profile.component.css']
})
export class CreateProfileComponent implements OnInit {

  emailiD: string;
  fullName: string;
  recordExists: boolean=false;
  verifyStatus:string="Verify";
  userProfile:UserProfile;
  constructor(private onboardingService: OnboardingService) { }

  ngOnInit() {
  }

  Verify(details) {
    debugger;
    this.onboardingService.VerifyUser(details.email, details.name).subscribe(res => {
      if (res == "Success") {
        this.recordExists = true;
        this.verifyStatus= "Success";
        this.onboardingService.GetProfileData(details.email).subscribe(res=>{
          if(res!=null)
          {
            this.userProfile=res;
            sessionStorage.setItem("PersonalData",JSON.stringify(this.userProfile.PersonalData));
            sessionStorage.setItem("Qualifications",JSON.stringify(this.userProfile.QualificationData));
            sessionStorage.setItem("TechnicalSkills",JSON.stringify(this.userProfile.TechnicalSkillData));
            sessionStorage.setItem("FunctionalSkills",JSON.stringify(this.userProfile.PersonalData));
            sessionStorage.setItem("Trainings",JSON.stringify(this.userProfile.PersonalData));
            sessionStorage.setItem("Certifications",JSON.stringify(this.userProfile.PersonalData));
            sessionStorage.setItem("Employers",JSON.stringify(this.userProfile.EmployerData));
            sessionStorage.setItem("Memberships",JSON.stringify(this.userProfile.MembershipData));
            sessionStorage.setItem("Insurance",JSON.stringify(this.userProfile.InsuranceData));
          
          }
        });
      }
      else
      {
        this.recordExists = false;
        this.verifyStatus="Failed";
        alert("Not such user exists")
      }
    });
  }

}
