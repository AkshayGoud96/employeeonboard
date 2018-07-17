import { Component, OnInit } from '@angular/core';
import { PersonalData } from '../PersonalData';
import { UserProfile } from '../UserProfile';
import { Subscription } from 'rxjs';
import { CommonService } from 'src/app/services/commonservice.service';

@Component({
  selector: 'app-personnel',
  templateUrl: './personnel.component.html',
  styleUrls: ['./personnel.component.css']
})
export class PersonnelComponent implements OnInit {

  personalData: PersonalData;
  userProfile: UserProfile;
  subscription: Subscription;
  submitted: string;
  constructor(private commonService: CommonService) { }

  ngOnInit() {
    this.submitted = sessionStorage.getItem("Submitted");
    this.subscription = this.commonService.notifyObservable$.subscribe((res) => {
      if (res.hasOwnProperty('option') && res.option === 'get') {
        this.personalData = JSON.parse(sessionStorage.getItem("UserProfile")).PersonalData;
      }
    });
    if (sessionStorage.getItem("UserProfile") != undefined) {
      this.personalData = JSON.parse(sessionStorage.getItem("UserProfile")).PersonalData;
    }
    else {
      this.personalData = new PersonalData();
      this.personalData.Gender = "Select";
    }
  }
  NextClick() {
    this.userProfile = JSON.parse(sessionStorage.getItem("UserProfile"));
    this.userProfile.PersonalData = this.personalData;
    sessionStorage.setItem("UserProfile", JSON.stringify(this.userProfile));
  }
}
