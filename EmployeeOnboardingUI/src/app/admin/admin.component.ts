import { Component, OnInit } from '@angular/core';
import { OnboardingService } from '../services/onboarding.service';
import { UserProfile } from '../UserProfile';
import { CommonService } from 'src/app/services/commonservice.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { VariableAst } from '@angular/compiler';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  allUsers: string[];
  emailID: string;
  pass: string;
  email: string;
  fullname: string;
  recordExists: boolean = false;
  verifyStatus: string = "Login";
  userProfile: UserProfile;
  hasError: boolean = false;
  appError: boolean = false;
  loading: boolean = false;
  errorMessage: string = "";
  subscription: Subscription;
  successMessage: string = "";
  constructor(private onboardingService: OnboardingService, private commonService: CommonService, private router: Router, private modalService: NgbModal) { }

  ngOnInit() {
    this.subscription = this.commonService.notifyObservable$.subscribe((res) => {
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
    this.loading = false;
  }

  Access(index)
  {
    this.onboardingService.LoginAccess(index).subscribe(
      res => {
        this.allUsers = res;
      }
    );
  }
 

  AddUserProfile(details)
  {
    this.onboardingService.CreateUserProfile(details.email, details.fullname).subscribe(
      response => {
        this.allUsers = response;
      }
    )

  }

  Verify(details) {
    this.loading = true;
    this.onboardingService.VerifyAdmin(details.email, details.passWord).subscribe(response => {
      if (response == "Saved" || response == "Submitted") {
        this.recordExists = true;
        this.verifyStatus = "Success";
        sessionStorage.setItem("Email", details.email);
        this.loading = false;
        this.onboardingService.GetAllUserData().subscribe(res =>
         {
            this.allUsers = res;
         } );
      }
      else {
        this.recordExists = false;
        this.verifyStatus = "Failed";
        this.loading = false;
        this.appError = true;
        this.errorMessage = "No such admin user exists";
        
      }
    },
      err => {
        this.hasError = true;
        this.loading = false;
      });
  }

}


