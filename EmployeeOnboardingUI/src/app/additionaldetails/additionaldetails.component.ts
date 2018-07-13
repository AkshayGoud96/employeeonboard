import { Component, OnInit } from '@angular/core';
import { AdditionalDetailsData } from '../AdditionalDetailsData';
import { UserProfile } from '../UserProfile';
import { OnboardingService } from '../services/onboarding.service';

@Component({
  selector: 'app-additionaldetails',
  templateUrl: './additionaldetails.component.html',
  styleUrls: ['./additionaldetails.component.css']
})
export class AdditionaldetailsComponent implements OnInit {

  additionalDetails:AdditionalDetailsData;
  userProfile:UserProfile;
  constructor(private onboardingService:OnboardingService) { }

  ngOnInit() {
    if(sessionStorage.getItem("AdditionalDetails") !=undefined)
    {
    this.additionalDetails=JSON.parse(sessionStorage.getItem("AdditionalDetails"));
    }
    else
    {
    this.additionalDetails=new AdditionalDetailsData();
    this.additionalDetails.BloodGroup="Select";
    }
    if(sessionStorage.getItem("UserProfile") != undefined)
    {
      this.userProfile=JSON.parse(sessionStorage.getItem("UserProfile"));
    }
    else
    {
      this.userProfile=new UserProfile();
    }
  }

  PreviousClick()
  {
    sessionStorage.setItem("AdditionalDetails",JSON.stringify(this.additionalDetails));
  }
SaveClick()
{
 sessionStorage.setItem("AdditionalDetails",JSON.stringify(this.additionalDetails));
debugger;
 this.userProfile.PersonalData=JSON.parse(sessionStorage.getItem("PersonalData"));
 this.userProfile.QualificationData=JSON.parse(sessionStorage.getItem("Qualifications"));
 this.userProfile.TechnicalSkillData=JSON.parse(sessionStorage.getItem("TechnicalSkills"));
 this.userProfile.FunctionalSkillData=JSON.parse(sessionStorage.getItem("FunctionalSkills"));
 this.userProfile.TrainingData=JSON.parse(sessionStorage.getItem("Trainings"));
 this.userProfile.CertificationData=JSON.parse(sessionStorage.getItem("Certifications"));
 this.userProfile.EmployerData=JSON.parse(sessionStorage.getItem("Employers"));
 this.userProfile.MembershipData=JSON.parse(sessionStorage.getItem("Memberships"));
 this.userProfile.InsuranceData=JSON.parse(sessionStorage.getItem("Insurance"));
 this.userProfile.AdditionalData=JSON.parse(sessionStorage.getItem("AdditionalDetails"));
 let formData:FormData=new FormData();
 formData.append("UserProfile",JSON.stringify(this.userProfile));
  this.onboardingService.SaveData(formData).subscribe(res=>{
    console.log(res);
  })

}

}
