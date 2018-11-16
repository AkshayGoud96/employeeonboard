import { Component, OnInit } from '@angular/core';
import { MemberShipData } from '../MemberShipData';
import { UserProfile } from '../UserProfile';
import { Subscription } from 'rxjs';
import { CommonService } from '../services/commonservice.service';
import { OnboardingService } from '../services/onboarding.service';

@Component({
  selector: 'app-memberships',
  templateUrl: './memberships.component.html',
  styleUrls: ['./memberships.component.css']
})
export class MembershipsComponent implements OnInit {

  membership: MemberShipData;
  memberships: Array<MemberShipData> = [];
  userProfile: UserProfile;
  submitted: string;
  subscription: Subscription;
  constructor(private commonService: CommonService,private onboardingService:OnboardingService) { }

  ngOnInit() {
      this.subscription = this.commonService.notifyObservable$.subscribe((res) => {
      if (res.hasOwnProperty('option') && res.option === 'get') {
        debugger;
        this.memberships = JSON.parse(sessionStorage.getItem("UserProfile")).MembershipData;
      }
    });
    this.submitted = sessionStorage.getItem("Submitted");
    debugger;
    if (sessionStorage.getItem("UserProfile") != undefined) {
      let memberships = JSON.parse(sessionStorage.getItem("UserProfile")).MembershipData;
      if(memberships != undefined)
      {
        this.memberships=memberships;
      }
     
    }
    this.membership = new MemberShipData();
  }
  AddMembership() {
    this.memberships.push(this.membership);
    this.membership = new MemberShipData();
    this.membership.IsEdited = false;
    this.userProfile = JSON.parse(sessionStorage.getItem("UserProfile"));
    this.userProfile.MembershipData = this.memberships;
    sessionStorage.setItem("UserProfile", JSON.stringify(this.userProfile));
  }

  DeleteMembership(item, index, table) {
    var confirmResult = confirm("Are you sure you want to delete ?");
    if(confirmResult)
    {
    var data = this.memberships.find(d => d.UPID == item.UPID);
    this.onboardingService.DeleteData(data.MDID, data.UPID, table).subscribe();
    this.memberships.splice(index, 1);
    }
    this.userProfile = JSON.parse(sessionStorage.getItem("UserProfile"));
    this.userProfile.MembershipData = this.memberships;
    sessionStorage.setItem("UserProfile", JSON.stringify(this.userProfile));
  }
  EditMembership(item) {
    item.IsEdited = true;
    this.userProfile = JSON.parse(sessionStorage.getItem("UserProfile"));
    this.userProfile.MembershipData = this.memberships;
    sessionStorage.setItem("UserProfile", JSON.stringify(this.userProfile));
  }
  SaveEditMembership(item) {
    item.IsEdited = false;
    this.userProfile = JSON.parse(sessionStorage.getItem("UserProfile"));
    this.userProfile.MembershipData = this.memberships;
    sessionStorage.setItem("UserProfile", JSON.stringify(this.userProfile));
  }

  PreviousClick() {
    if(this.memberships != [])
    {
    this.userProfile = JSON.parse(sessionStorage.getItem("UserProfile"));
    this.userProfile.MembershipData = this.memberships;
    sessionStorage.setItem("UserProfile", JSON.stringify(this.userProfile));
    }
  }

  NextClick() {
    this.userProfile = JSON.parse(sessionStorage.getItem("UserProfile"));
    this.userProfile.MembershipData = this.memberships;
    sessionStorage.setItem("UserProfile", JSON.stringify(this.userProfile));
  }
}
