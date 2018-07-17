import { Component, OnInit } from '@angular/core';
import { OnboardingService } from '../services/onboarding.service';
import { UserProfile } from '../UserProfile';
import { CommonService } from 'src/app/services/commonservice.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-create-profile',
  templateUrl: './create-profile.component.html',
  styleUrls: ['./create-profile.component.css']
})
export class CreateProfileComponent implements OnInit {

  emailiD: string;
  fullName: string;
  recordExists: boolean = false;
  verifyStatus: string = "Verify";
  userProfile: UserProfile;
  hasError: boolean = false;
  appError: boolean = false;
  loading: boolean = false;
  errorMessage: string = "";
  subscription: Subscription;
  successMessage: string = "";
  constructor(private onboardingService: OnboardingService, private commonService: CommonService) { }

  ngOnInit() {
    sessionStorage.clear();
    this.subscription = this.commonService.notifyObservable$.subscribe((res) => {
      debugger;
      if (res.hasOwnProperty('option') && res.option === 'success' && res.value != undefined) {
        this.successMessage = res.value;
      }
      if (res.hasOwnProperty('option') && res.option === 'error' && res.value != undefined) {
        this.errorMessage = res.value;
      }
      if (res.hasOwnProperty('option') && res.option === 'load' && res.value != undefined) {
        this.loading = res;
      }
    });
    this.userProfile = new UserProfile();
    this.loading = false;
  }

  Verify(details) {
    sessionStorage.clear();
    this.loading = true;
    this.onboardingService.VerifyUser(details.email, details.name).subscribe(response => {
      if (response == "Saved" || response == "Submitted") {
        this.recordExists = true;
        this.verifyStatus = "Success";
        sessionStorage.setItem("Email", details.email);
        this.onboardingService.GetProfileData(details.email).subscribe(res => {
          if (res != null) {
            this.userProfile.PersonalData = res.PersonalDatas[0];
            this.userProfile.InsuranceData = res.InsuranceDatas[0];
            this.userProfile.AdditionalData = res.AdditionalDatas[0];
            this.userProfile.QualificationData = res.QualificationDatas;
            this.userProfile.TechnicalSkillData = res.TechnicalSkillDatas;
            this.userProfile.FunctionalSkillData = res.FunctionalSkillDatas;
            this.userProfile.CertificationData = res.CertificationDatas;
            this.userProfile.EmployerData = res.EmployerDatas;
            this.userProfile.MembershipData = res.MembershipDatas;
            this.userProfile.TrainingData = res.TainingDatas;
            sessionStorage.setItem("UserProfile", JSON.stringify(this.userProfile));
            this.commonService.notifyOther({ option: 'get', value: res });
            this.loading = false;
          }
          else {
            this.loading = false;
          }
          this.appError = false;
          this.hasError = false;
          if (response == "Submitted") {
            sessionStorage.setItem("Submitted", "Submitted");
          }
          if (response == "Saved") {
            sessionStorage.setItem("Submitted", "Saved");
          }
        },
          err => {
            this.hasError = true;
            this.loading = false;
          });
      }
      else {
        this.recordExists = false;
        this.verifyStatus = "Failed";
        this.loading = false;
        this.appError = true;
        this.errorMessage = "No such user exists";
      }
    },
      err => {
        this.hasError = true;
        this.loading = false;
      });
  }

}
