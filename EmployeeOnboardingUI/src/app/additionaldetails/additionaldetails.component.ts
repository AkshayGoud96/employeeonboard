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

  additionalDetails: AdditionalDetailsData;
  userProfile: UserProfile;
  constructor(private onboardingService: OnboardingService) { }

  ngOnInit() {
    debugger;
    if (sessionStorage.getItem("UserProfile") != undefined) {
      this.additionalDetails = JSON.parse(sessionStorage.getItem("UserProfile")).AdditionalData;
    }
    else {
      this.additionalDetails = new AdditionalDetailsData();
      this.additionalDetails.BloodGroup = "Select";
    }
  }

  PreviousClick() {
    this.userProfile = JSON.parse(sessionStorage.getItem("UserProfile"));
    this.userProfile.AdditionalData = this.additionalDetails;
    sessionStorage.setItem("UserProfile", JSON.stringify(this.userProfile));
  }
  SaveClick() {
    this.userProfile = JSON.parse(sessionStorage.getItem("UserProfile"));
    this.userProfile.AdditionalData = this.additionalDetails;
    sessionStorage.setItem("UserProfile", JSON.stringify(this.userProfile));

    let formData: FormData = new FormData();
    formData.append("UserProfile", JSON.stringify(this.userProfile));
    formData.append("Email", sessionStorage.getItem("Email"));
    this.onboardingService.SaveData(formData).subscribe(res => {
      console.log(res);
    })

  }

}
