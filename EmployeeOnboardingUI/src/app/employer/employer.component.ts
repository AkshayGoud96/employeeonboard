import { Component, OnInit } from '@angular/core';
import { EmployerData } from '../EmployerData';
import { UserProfile } from '../UserProfile';
import { Subscription } from 'rxjs';
import { CommonService } from '../services/commonservice.service';

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
  constructor(private commonService: CommonService) { }

  ngOnInit() {
    this.subscription = this.commonService.notifyObservable$.subscribe((res) => {
      if (res.hasOwnProperty('option') && res.option === 'get') {
        this.employers = JSON.parse(sessionStorage.getItem("UserProfile")).EmployerData;
      }
    });
    this.submitted = sessionStorage.getItem("Submitted");
    if (sessionStorage.getItem("UserProfile") != undefined) {
      this.employers = JSON.parse(sessionStorage.getItem("UserProfile")).EmployerData;
    }
    this.employer = new EmployerData();
  }
  AddEmployer() {
    this.employers.push(this.employer);
    this.employer = new EmployerData();
    this.employer.IsEdited = false;
  }

  DeleteEmployer(index) {
    this.employers.splice(index, 1);
  }
  EditEmployer(item) {
    item.IsEdited = true;
  }
  SaveEditEmployer(item) {
    item.IsEdited = false;
  }

  PreviousClick() {
    this.userProfile = JSON.parse(sessionStorage.getItem("UserProfile"));
    this.userProfile.EmployerData = this.employers;
    sessionStorage.setItem("UserProfile", JSON.stringify(this.userProfile));
  }

  NextClick() {
    this.userProfile = JSON.parse(sessionStorage.getItem("UserProfile"));
    this.userProfile.EmployerData = this.employers;
    sessionStorage.setItem("UserProfile", JSON.stringify(this.userProfile));
  }
}
