import { Component, OnInit } from '@angular/core';
import { PersonalData } from '../PersonalData';
import { UserProfile } from '../UserProfile';

@Component({
  selector: 'app-personnel',
  templateUrl: './personnel.component.html',
  styleUrls: ['./personnel.component.css']
})
export class PersonnelComponent implements OnInit {

  personalData: PersonalData;
  userProfile:UserProfile;
  constructor() { }

  ngOnInit() {
    if(sessionStorage.getItem("UserProfile") !=undefined)
    {
      debugger;
    this.personalData=JSON.parse(sessionStorage.getItem("UserProfile")).PersonalData;
    }
    else
    {
    this.personalData = new PersonalData();
    this.personalData.Gender = "Select";
    }
  }
  NextClick() {
    debugger;
    this.userProfile=JSON.parse(sessionStorage.getItem("UserProfile"));
    this.userProfile.PersonalData=this.personalData;
    sessionStorage.setItem("UserProfile", JSON.stringify(this.userProfile));
  }
}
