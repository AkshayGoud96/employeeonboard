import { Component, OnInit } from '@angular/core';
import { EmployerData } from '../EmployerData';
import { UserProfile } from '../UserProfile';
import { Subscription } from 'rxjs';
import { CommonService } from '../services/commonservice.service';
import { OnboardingService } from '../services/onboarding.service';

@Component({
  selector: 'app-employer',
  templateUrl: './employer.component.html',
  styleUrls: ['./employer.component.css']
})
export class EmployerComponent implements OnInit {

  employer: EmployerData;
  employers: Array<EmployerData> = [];
  userProfile: UserProfile;
  submitted: string;
  subscription: Subscription;
  constructor(private commonService: CommonService,private onboardingService:OnboardingService) { }

  ngOnInit() {
    this.subscription = this.commonService.notifyObservable$.subscribe((res) => {
      if (res.hasOwnProperty('option') && res.option === 'get') {
        this.employers = JSON.parse(sessionStorage.getItem("UserProfile")).EmployerData;
      }
    });
    this.submitted = sessionStorage.getItem("Submitted");
    if (sessionStorage.getItem("UserProfile") != undefined) {
      let employers = JSON.parse(sessionStorage.getItem("UserProfile")).EmployerData;
      if(employers != undefined)
      {
        this.employers=employers;
      }
     
    }
    this.employer = new EmployerData();
  }
  AddEmployer() {
    this.employers.push(this.employer);
    this.employer = new EmployerData();
    this.employer.IsEdited = false;
  }

  DeleteEmployer(item, index, table) {
    var confirmResult = confirm("Are you sure you want to delete ?");
    if(confirmResult)
    {
    var data = this.employers.find(d => d.UPID == item.UPID);
    this.onboardingService.DeleteData(data.EDID, data.UPID, table).subscribe();
    this.employers.splice(index, 1);
    }
  }

  EditEmployer(item) {
    item.IsEdited = true;
  }
  SaveEditEmployer(item) {
    item.IsEdited = false;
  }

  PreviousClick() {
    if(this.employers != [])
    {
    this.userProfile = JSON.parse(sessionStorage.getItem("UserProfile"));
    this.userProfile.EmployerData = this.employers;
    sessionStorage.setItem("UserProfile", JSON.stringify(this.userProfile));
    }
  }

  NextClick() {
    this.userProfile = JSON.parse(sessionStorage.getItem("UserProfile"));
    this.userProfile.EmployerData = this.employers;
    sessionStorage.setItem("UserProfile", JSON.stringify(this.userProfile));
  }
}
