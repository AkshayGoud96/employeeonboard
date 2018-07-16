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
    this.userProfile=new UserProfile();
  }

  Verify(details) {
    debugger;
    this.onboardingService.VerifyUser(details.email, details.name).subscribe(res => {
      if (res == "Success") {
        this.recordExists = true;
        this.verifyStatus= "Success";
        sessionStorage.setItem("Email",details.email);
        this.onboardingService.GetProfileData(details.email).subscribe(res=>{
          if(res!=null)
          {
            debugger;
            this.userProfile.PersonalData=res.PersonalDatas[0];
            this.userProfile.InsuranceData=res.InsuranceDatas[0];
            this.userProfile.AdditionalData=res.AdditionalDatas[0];
            this.userProfile.QualificationData=res.QualificationDatas;
            this.userProfile.TechnicalSkillData=res.TechnicalSkillDatas;
            this.userProfile.FunctionalSkillData=res.FunctionalSkillDatas;
            this.userProfile.CertificationData=res.CertificationDatas;
            this.userProfile.EmployerData=res.EmployerDatas;
            this.userProfile.MembershipData=res.MembershipDatas;
            this.userProfile.TrainingData=res.TainingDatas;
            sessionStorage.setItem("UserProfile",JSON.stringify(this.userProfile));
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
