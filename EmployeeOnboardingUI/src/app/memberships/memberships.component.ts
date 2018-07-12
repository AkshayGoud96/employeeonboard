import { Component, OnInit } from '@angular/core';
import { MemberShipData } from '../MemberShipData';

@Component({
  selector: 'app-memberships',
  templateUrl: './memberships.component.html',
  styleUrls: ['./memberships.component.css']
})
export class MembershipsComponent implements OnInit {

  membership:MemberShipData;
memberships:Array<MemberShipData>=[];

  constructor() { }

  ngOnInit() {
    if(sessionStorage.getItem("Memberships") !=undefined)
    {
    this.memberships=JSON.parse(sessionStorage.getItem("Memberships"));
    }
    this.membership=new MemberShipData();
  }
  AddMembership() {
    debugger;
    this.memberships.push(this.membership);
    this.membership = new MemberShipData();
    this.membership.IsEdited=false;
  }

  DeleteMembership(index)
  {
    this.memberships.splice(index,1);
  }
  EditMembership(item)
  {
   item.IsEdited=true;
  }
  SaveEditMembership(item)
  {
    item.IsEdited=false;
  }

  PreviousClick()
  {
    sessionStorage.setItem("Memberships",JSON.stringify(this.memberships));
  }

  NextClick()
  {
    sessionStorage.setItem("Memberships",JSON.stringify(this.memberships));
  }
}
