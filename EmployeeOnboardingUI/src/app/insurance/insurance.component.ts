import { Component, OnInit } from '@angular/core';
import { InsuranceData } from '../InsuranceData';
import { UserProfile } from '../UserProfile';
import { Subscription } from 'rxjs';
import { CommonService } from '../services/commonservice.service';
import { OnboardingService } from '../services/onboarding.service';

@Component({
  selector: 'app-insurance',
  templateUrl: './insurance.component.html',
  styleUrls: ['./insurance.component.css']
})
export class InsuranceComponent implements OnInit {

  insurance: InsuranceData;
  userProfile: UserProfile;
  submitted: string;
  subscription: Subscription;
  constructor(private commonService: CommonService,private onboardingService:OnboardingService) { }
  ngOnInit() {
    this.subscription = this.commonService.notifyObservable$.subscribe((res) => {
      if (res.hasOwnProperty('option') && res.option === 'get') {
        this.insurance = JSON.parse(sessionStorage.getItem("UserProfile")).InsuranceData;
      }
    });
    this.submitted = sessionStorage.getItem("Submitted");
    if (sessionStorage.getItem("UserProfile") != undefined && JSON.parse(sessionStorage.getItem("UserProfile")).InsuranceData != undefined) {
      this.insurance = JSON.parse(sessionStorage.getItem("UserProfile")).InsuranceData;
    }
    else {
      this.insurance = new InsuranceData();
      this.insurance.RelationshipType = "Select";
      this.insurance.MaritalStatus = "Select";
      this.insurance.SpouseGender = "Select";
      this.insurance.Child1Gender = "Select";
      this.insurance.Child2Gender = "Select";
    }
  }
  PreviousClick() {
    this.userProfile = JSON.parse(sessionStorage.getItem("UserProfile"));
    this.userProfile.InsuranceData = this.insurance;
    sessionStorage.setItem("UserProfile", JSON.stringify(this.userProfile));
  }

  NextClick() {
    this.userProfile = JSON.parse(sessionStorage.getItem("UserProfile"));
    this.userProfile.InsuranceData = this.insurance;
    sessionStorage.setItem("UserProfile", JSON.stringify(this.userProfile));
  }
}
