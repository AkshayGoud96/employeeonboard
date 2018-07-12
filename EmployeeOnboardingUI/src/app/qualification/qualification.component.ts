import { Component, OnInit } from '@angular/core';
import { QualificationData } from '../QualificationData';

@Component({
  selector: 'app-qualification',
  templateUrl: './qualification.component.html',
  styleUrls: ['./qualification.component.css']
})
export class QualificationComponent implements OnInit {
  model: QualificationData;
  qualifications: Array<QualificationData> = [];
  constructor() {
    
  }

  ngOnInit() {
    if(sessionStorage.getItem("Qualifications") !=undefined)
    {
    this.qualifications=JSON.parse(sessionStorage.getItem("Qualifications"));
    }
    this.model = new QualificationData();
    this.model.Qualification="Select";
    this.model.YearOfCompletion="Select";
   }

  AddQualification() {
    debugger;
    this.qualifications.push(this.model);
    this.model=new QualificationData();
    this.model.Qualification="Select";
    this.model.YearOfCompletion="Select";
    this.model.IsEditable=false;
  }

  DeleteQualification(index)
  {
    this.qualifications.splice(index,1);
  }
  EditQualification(item)
  {
   item.IsEditable=true;
  }
  SaveEditQualification(item)
  {
    item.IsEditable=false;
  }

  PreviousClick()
  {
    sessionStorage.setItem("Qualifications",JSON.stringify(this.qualifications));
  }

  NextClick()
  {
    sessionStorage.setItem("Qualifications",JSON.stringify(this.qualifications));
  }

}