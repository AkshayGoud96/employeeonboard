import { Component, OnInit } from '@angular/core';
import { EmployerData } from '../EmployerData';

@Component({
  selector: 'app-employer',
  templateUrl: './employer.component.html',
  styleUrls: ['./employer.component.css']
})
export class EmployerComponent implements OnInit {

  employer:EmployerData;
  employers:Array<EmployerData>=[];

  constructor() { }

  ngOnInit() {
    if(sessionStorage.getItem("Employers") !=undefined)
    {
    this.employers=JSON.parse(sessionStorage.getItem("Employers"));
    }
    this.employer = new EmployerData();
  }
  AddEmployer() {
    this.employers.push(this.employer);
    this.employer = new EmployerData();
    this.employer.IsEdited=false;
  }

  DeleteEmployer(index)
  {
    this.employers.splice(index,1);
  }
  EditEmployer(item)
  {
   item.IsEdited=true;
  }
  SaveEditEmployer(item)
  {
    item.IsEdited=false;
  }

  PreviousClick()
  {
    sessionStorage.setItem("Employers",JSON.stringify(this.employers));
  }

  NextClick()
  {
    sessionStorage.setItem("Employers",JSON.stringify(this.employers));
  }
}
