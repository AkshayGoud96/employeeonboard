import { Component, OnInit } from '@angular/core';
import { OnboardingService } from '../services/onboarding.service';
import { CommonService } from '../services/commonservice.service';

@Component({
  selector: 'app-submission',
  templateUrl: './submission.component.html',
  styleUrls: ['./submission.component.css']
})
export class SubmissionComponent implements OnInit {
submitted:string;
  constructor(private onboardingService: OnboardingService,private commonService:CommonService) { }

  ngOnInit() {
  }
  SubmitData() {
    this.onboardingService.SubmitData().subscribe(res => {
      this.commonService.notifyOther({ option: 'success', value: "Data is submitted successfully" });
      this.submitted="Submitted";
      sessionStorage.setItem("Submitted","Submitted");
    }, err => {
      this.commonService.notifyOther({ option: 'error', value: err.message });
    })
  }
}
