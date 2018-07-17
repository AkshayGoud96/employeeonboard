import { Component, OnInit } from '@angular/core';
import { MemberShipData } from '../MemberShipData';
import { UserProfile } from '../UserProfile';
import { Subscription } from 'rxjs';
import { CommonService } from '../services/commonservice.service';

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
  constructor(private commonService: CommonService) { }

  ngOnInit() {
    this.subscription = this.commonService.notifyObservable$.subscribe((res) => {
      if (res.hasOwnProperty('option') && res.option === 'get') {
        this.memberships = JSON.parse(sessionStorage.getItem("UserProfile")).MemberShipData;
      }
    });
    this.submitted = sessionStorage.getItem("Submitted");
    if (sessionStorage.getItem("UserProfile") != undefined) {
      this.memberships = JSON.parse(sessionStorage.getItem("UserProfile")).MembershipData;
    }
    this.membership = new MemberShipData();
  }
  AddMembership() {
    debugger;
    this.memberships.push(this.membership);
    this.membership = new MemberShipData();
    this.membership.IsEdited = false;
  }

  DeleteMembership(index) {
    this.memberships.splice(index, 1);
  }
  EditMembership(item) {
    item.IsEdited = true;
  }
  SaveEditMembership(item) {
    item.IsEdited = false;
  }

  PreviousClick() {
    this.userProfile = JSON.parse(sessionStorage.getItem("UserProfile"));
    this.userProfile.MembershipData = this.memberships;
    sessionStorage.setItem("UserProfile", JSON.stringify(this.userProfile));
  }

  NextClick() {
    this.userProfile = JSON.parse(sessionStorage.getItem("UserProfile"));
    this.userProfile.MembershipData = this.memberships;
    sessionStorage.setItem("UserProfile", JSON.stringify(this.userProfile));
  }
}
