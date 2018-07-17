import { Component, OnInit } from '@angular/core';
import { CertificationData } from '../CertificationData';
import { UserProfile } from '../UserProfile';
import { Subscription } from 'rxjs';
import { CommonService } from '../services/commonservice.service';

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
  constructor(private commonService: CommonService) { }

  ngOnInit() {
    this.subscription = this.commonService.notifyObservable$.subscribe((res) => {
      if (res.hasOwnProperty('option') && res.option === 'get') {
        this.certifications = JSON.parse(sessionStorage.getItem("UserProfile")).CertificationData;
      }
    });
    this.submitted = sessionStorage.getItem("Submitted");
    if (sessionStorage.getItem("UserProfile") != undefined) {
      this.certifications = JSON.parse(sessionStorage.getItem("UserProfile")).CertificationData;
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
    this.userProfile = JSON.parse(sessionStorage.getItem("UserProfile"));
    this.userProfile.CertificationData = this.certifications;
    sessionStorage.setItem("UserProfile", JSON.stringify(this.userProfile));
  }

  NextClick() {
    this.userProfile = JSON.parse(sessionStorage.getItem("UserProfile"));
    this.userProfile.CertificationData = this.certifications;
    sessionStorage.setItem("UserProfile", JSON.stringify(this.userProfile));
  }

}
