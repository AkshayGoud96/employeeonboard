import { Component, OnInit } from '@angular/core';
import { OnboardingService } from '../services/onboarding.service';

@Component({
  selector: 'app-create-profile',
  templateUrl: './create-profile.component.html',
  styleUrls: ['./create-profile.component.css']
})
export class CreateProfileComponent implements OnInit {

  emailiD: string;
  fullName: string;
  recordExists: boolean=false;
  verifyStatus:string="Verify";
  constructor(private onboardingService: OnboardingService) { }

  ngOnInit() {
  }

  Verify(details) {
    debugger;
    this.onboardingService.VerifyUser(details.email, details.name).subscribe(res => {
      if (res == "Success") {
        this.recordExists = true;
        this.verifyStatus= "Success"
      }
      else
      {
        this.recordExists = false;
        this.verifyStatus="Failed";
        alert("Not such user exists")
      }
    });
  }

}
