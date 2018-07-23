import { Component, OnInit } from '@angular/core';
import { QualificationData } from '../QualificationData';
import { UserProfile } from '../UserProfile';
import { Subscription } from 'rxjs';
import { CommonService } from '../services/commonservice.service';
import { OnboardingService } from '../services/onboarding.service';

@Component({
  selector: 'app-qualification',
  templateUrl: './qualification.component.html',
  styleUrls: ['./qualification.component.css']
})
export class QualificationComponent implements OnInit {
  model: QualificationData;
  qualifications: Array<QualificationData> = [];
  userProfile: UserProfile;
  submitted: string;
  subscription: Subscription;
  constructor(private commonService: CommonService,private onboardingService:OnboardingService) { }



  ngOnInit() {
    this.subscription = this.commonService.notifyObservable$.subscribe((res) => {
      if (res.hasOwnProperty('option') && res.option === 'get') {
        this.qualifications = JSON.parse(sessionStorage.getItem("UserProfile")).QualificationData;
      }
    });
    this.submitted = sessionStorage.getItem("Submitted");
    if (sessionStorage.getItem("UserProfile") != undefined) {
      let qualifications = JSON.parse(sessionStorage.getItem("UserProfile")).QualificationData;
      if(qualifications != undefined)
      {
        this.qualifications=qualifications;
      }
     
    }
    this.model = new QualificationData();
    this.model.Qualification = "Select";
    this.model.YearOfCompletion = "Select";
  }

  AddQualification() {
    this.qualifications.push(this.model);
    this.model = new QualificationData();
    this.model.Qualification = "Select";
    this.model.YearOfCompletion = "Select";
    this.model.IsEditable = false;
  }

  DeleteQualification(index) {
    this.qualifications.splice(index, 1);
  }
  EditQualification(item) {
    item.IsEditable = true;
  }
  SaveEditQualification(item) {
    item.IsEditable = false;
  }

  PreviousClick() {
    if(this.qualifications != [])
    {
    this.userProfile = JSON.parse(sessionStorage.getItem("UserProfile"));
    if(this.userProfile.QualificationData==undefined)
    {
     
    }
    this.userProfile.QualificationData = this.qualifications;
    sessionStorage.setItem("UserProfile", JSON.stringify(this.userProfile));
    }
  }

  NextClick() {
    this.userProfile = JSON.parse(sessionStorage.getItem("UserProfile"));
    this.userProfile.QualificationData = this.qualifications;
    sessionStorage.setItem("UserProfile", JSON.stringify(this.userProfile));
  }

}
