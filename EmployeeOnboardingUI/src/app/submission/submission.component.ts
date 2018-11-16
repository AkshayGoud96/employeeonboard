import { Component, OnInit } from '@angular/core';
import { OnboardingService } from '../services/onboarding.service';
import { CommonService } from '../services/commonservice.service';
import { UserProfile } from '../UserProfile';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-submission',
  templateUrl: './submission.component.html',
  styleUrls: ['./submission.component.css']
})
export class SubmissionComponent implements OnInit {
  userProfile: UserProfile;
  submitted: string;
  checkAgree:string = 'unchecked';
  subscription: Subscription;
  signature: string;
  constructor(private onboardingService: OnboardingService,private commonService:CommonService) { }

  ngOnInit() {
  }
  SubmitData() {
    this.onboardingService.SubmitData().subscribe(res => {
      this.commonService.notifyOther({ option: 'success', value: res });
      this.submitted="Submitted";
      sessionStorage.setItem("Submitted","Submitted");
      sessionStorage.setItem("Signature", this.signature);
    }, err => {
      this.commonService.notifyOther({ option: 'error', value: err.message });
    })  
  }
  

  SaveClick() {
    if (sessionStorage.getItem("Submitted")!="true") {
      this.userProfile = JSON.parse(sessionStorage.getItem("UserProfile"));
      sessionStorage.setItem("UserProfile", JSON.stringify(this.userProfile));

      let formData: FormData = new FormData();
      formData.append("UserProfile", JSON.stringify(this.userProfile));
      formData.append("Email", sessionStorage.getItem("Email"));
      this.onboardingService.SaveData(formData).subscribe(res => {
        this.commonService.notifyOther({ option: 'success', value: res });
      },
        err => {
          this.commonService.notifyOther({ option: 'error', value: err.message });
        }
      );
    }
  }

  
  DisclaimerCheck(event)
  {
    if(event.target.checked)
      this.checkAgree = 'checked';
    else if(!event.target.checked)
      this.checkAgree='unchecked';
  }
}
