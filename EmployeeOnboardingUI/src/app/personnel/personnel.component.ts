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
    if(sessionStorage.getItem("PersonalData") !=undefined)
    {
    this.personalData=JSON.parse(sessionStorage.getItem("PersonalData"));
    }
    else
    {
    this.personalData = new PersonalData();
    this.personalData.Gender = "Select";
    }
  }
  NextClick() {
    debugger;
    sessionStorage.setItem("PersonalData", JSON.stringify(this.personalData));
  }
}
