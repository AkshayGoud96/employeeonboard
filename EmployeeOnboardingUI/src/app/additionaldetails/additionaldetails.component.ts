import { Component, OnInit } from '@angular/core';
import { AdditionalDetailsData } from '../AdditionalDetailsData';
import { UserProfile } from '../UserProfile';
import { OnboardingService } from '../services/onboarding.service';
import { CommonService } from '../services/commonservice.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-additionaldetails',
  templateUrl: './additionaldetails.component.html',
  styleUrls: ['./additionaldetails.component.css']
})
export class AdditionaldetailsComponent implements OnInit {

  additionalDetails: AdditionalDetailsData;
  userProfile: UserProfile;
  submitted: string;
  subscription: Subscription;
  constructor(private onboardingService: OnboardingService, private commonService: CommonService, private router: Router) { }

  ngOnInit() {
    this.subscription = this.commonService.notifyObservable$.subscribe((res) => {
      if (res.hasOwnProperty('option') && res.option === 'get') {
        this.additionalDetails = JSON.parse(sessionStorage.getItem("UserProfile")).AdditionalData;
      }
    });

    this.submitted = sessionStorage.getItem("Submitted");
    if (sessionStorage.getItem("UserProfile") != undefined && JSON.parse(sessionStorage.getItem("UserProfile")).AdditionalData !=undefined) {
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
    if (sessionStorage.getItem("Submitted")!="true") {
      this.userProfile = JSON.parse(sessionStorage.getItem("UserProfile"));
      this.userProfile.AdditionalData = this.additionalDetails;
      sessionStorage.setItem("UserProfile", JSON.stringify(this.userProfile));

      let formData: FormData = new FormData();
      formData.append("UserProfile", JSON.stringify(this.userProfile));
      formData.append("Email", sessionStorage.getItem("Email"));
      this.onboardingService.SaveData(formData).subscribe(res => {
        this.commonService.notifyOther({ option: 'success', value: res });
        this.router.navigateByUrl('/Home/CreateProfile/submission');
      },
        err => {
          this.commonService.notifyOther({ option: 'error', value: err.message });
        }
      );
    }
  }

}
