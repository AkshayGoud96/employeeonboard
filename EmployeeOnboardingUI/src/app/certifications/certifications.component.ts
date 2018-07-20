import { Component, OnInit } from '@angular/core';
import { CertificationData } from '../CertificationData';
import { UserProfile } from '../UserProfile';
import { Subscription } from 'rxjs';
import { CommonService } from '../services/commonservice.service';
import { OnboardingService } from '../services/onboarding.service';

@Component({
  selector: 'app-certifications',
  templateUrl: './certifications.component.html',
  styleUrls: ['./certifications.component.css']
})
export class CertificationsComponent implements OnInit {

  certification: CertificationData;
  certifications: Array<CertificationData> = [];
  userProfile: UserProfile;
  submitted: string;
  subscription: Subscription;
  constructor(private commonService: CommonService,private onboardingService:OnboardingService) { }

  ngOnInit() {
    this.subscription = this.commonService.notifyObservable$.subscribe((res) => {
      if (res.hasOwnProperty('option') && res.option === 'get') {
        this.certifications = JSON.parse(sessionStorage.getItem("UserProfile")).CertificationData;
      }
    });
    this.submitted = sessionStorage.getItem("Submitted");
    if (sessionStorage.getItem("UserProfile") != undefined) {
      let certifications = JSON.parse(sessionStorage.getItem("UserProfile")).CertificationData;
      if(certifications != undefined)
      {
        this.certifications=certifications;
      }
     
    }
    this.certification = new CertificationData();
    this.certification.Category = "Select";
  }

  AddCertification() {
    debugger;
    this.certifications.push(this.certification);
    this.certification = new CertificationData();
    this.certification.Category = "Select";
    this.certification.IsEdited = false;
  }

  DeleteCertification(index) {
    this.certifications.splice(index, 1);
  }
  EditCertification(item) {
    item.IsEdited = true;
  }
  SaveEditCertification(item) {
    item.IsEdited = false;
  }

  PreviousClick() {
    if(this.certifications!=[])
    {
    this.userProfile = JSON.parse(sessionStorage.getItem("UserProfile"));
    this.userProfile.CertificationData = this.certifications;
    sessionStorage.setItem("UserProfile", JSON.stringify(this.userProfile));
    }
  }

  NextClick() {
    this.userProfile = JSON.parse(sessionStorage.getItem("UserProfile"));
    this.userProfile.CertificationData = this.certifications;
    sessionStorage.setItem("UserProfile", JSON.stringify(this.userProfile));
  }

}
