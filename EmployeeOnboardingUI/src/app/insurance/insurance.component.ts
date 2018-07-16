import { Component, OnInit } from '@angular/core';
import { InsuranceData } from '../InsuranceData';
import { UserProfile } from '../UserProfile';

@Component({
  selector: 'app-insurance',
  templateUrl: './insurance.component.html',
  styleUrls: ['./insurance.component.css']
})
export class InsuranceComponent implements OnInit {

  insurance:InsuranceData;
  userProfile:UserProfile;

  constructor() { }

  ngOnInit() {
     if(sessionStorage.getItem("UserProfile") !=undefined)
    {
    this.insurance=JSON.parse(sessionStorage.getItem("UserProfile")).InsuranceData;
    }
    else
    {
    this.insurance=new InsuranceData();
    this.insurance.RelationshipType="Select";
    this.insurance.MaritalStatus="Select";
    this.insurance.SpouseGender="Select";
    this.insurance.Child1Gender="Select";
    this.insurance.Child2Gender="Select";
    }
  }
  PreviousClick()
  {
    this.userProfile=JSON.parse(sessionStorage.getItem("UserProfile"));
    this.userProfile.InsuranceData=this.insurance;
    sessionStorage.setItem("UserProfile", JSON.stringify(this.userProfile));
    sessionStorage.setItem("Insurance",JSON.stringify(this.insurance));
  }

  NextClick()
  {
    sessionStorage.setItem("Insurance",JSON.stringify(this.insurance));
  }
}
