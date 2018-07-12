import { Component, OnInit } from '@angular/core';
import { InsuranceData } from '../InsuranceData';

@Component({
  selector: 'app-insurance',
  templateUrl: './insurance.component.html',
  styleUrls: ['./insurance.component.css']
})
export class InsuranceComponent implements OnInit {

  insurance:InsuranceData;

  constructor() { }

  ngOnInit() {
     if(sessionStorage.getItem("Insurance") !=undefined)
    {
    this.insurance=JSON.parse(sessionStorage.getItem("Insurance"));
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
    sessionStorage.setItem("Insurance",JSON.stringify(this.insurance));
  }

  NextClick()
  {
    sessionStorage.setItem("Insurance",JSON.stringify(this.insurance));
  }
}
