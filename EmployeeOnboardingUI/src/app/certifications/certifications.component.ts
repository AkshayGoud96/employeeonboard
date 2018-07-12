import { Component, OnInit } from '@angular/core';
import {CertificationData} from '../CertificationData';

@Component({
  selector: 'app-certifications',
  templateUrl: './certifications.component.html',
  styleUrls: ['./certifications.component.css']
})
export class CertificationsComponent implements OnInit {

  certification:CertificationData;
  certifications:Array<CertificationData>=[];
  constructor() { }

  ngOnInit() {
    if(sessionStorage.getItem("Certifications") !=undefined)
    {
    this.certifications=JSON.parse(sessionStorage.getItem("Trainings"));
    }
    this.certification = new CertificationData();
    this.certification.Category="Select";
  }

  AddCertification() {
    debugger;
    this.certifications.push(this.certification);
    this.certification = new CertificationData();
    this.certification.Category="Select";
    this.certification.IsEdited=false;
  }

  DeleteCertification(index)
  {
    this.certifications.splice(index,1);
  }
  EditCertification(item)
  {
   item.IsEdited=true;
  }
  SaveEditCertification(item)
  {
    item.IsEdited=false;
  }

  PreviousClick()
  {
    sessionStorage.setItem("Certifications",JSON.stringify(this.certifications));
  }

  NextClick()
  {
    sessionStorage.setItem("Certifications",JSON.stringify(this.certifications));
  }

}
