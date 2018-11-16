import { Component, OnInit } from '@angular/core';
import { TrainingData } from '../TrainingData';
import { UserProfile } from '../UserProfile';
import { Subscription } from 'rxjs';
import { CommonService } from '../services/commonservice.service';
import { OnboardingService } from '../services/onboarding.service';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit {

  training: TrainingData;
  trainings: Array<TrainingData> = [];
  userProfile: UserProfile;
  submitted: string;
  subscription: Subscription;
  constructor(private commonService: CommonService,private onboardingService:OnboardingService) { }

  ngOnInit() {
    this.subscription = this.commonService.notifyObservable$.subscribe((res) => {
      if (res.hasOwnProperty('option') && res.option === 'get') {
        this.trainings = JSON.parse(sessionStorage.getItem("UserProfile")).TrainingData;
      }
    });
    this.submitted = sessionStorage.getItem("Submitted");
    if (sessionStorage.getItem("UserProfile") != undefined) {
      let trainings = JSON.parse(sessionStorage.getItem("UserProfile")).TrainingData;
      if (trainings != undefined) {
        this.trainings = trainings;
      }
    }
    this.training = new TrainingData();
    this.training.Category = "Select";
  }

  AddTraining() {
    this.trainings.push(this.training);
    this.training = new TrainingData();
    this.training.Category = "Select";
    this.training.IsEdited = false;
  }

  DeleteTraining(item, index, table) {
    var confirmResult = confirm("Are you sure you want to delete ?");
    if(confirmResult)
    {
    var data = this.trainings.find(d => d.UPID == item.UPID);
    this.onboardingService.DeleteData(data.TDID, data.UPID, table).subscribe();
    this.trainings.splice(index, 1);
    }
  }
  EditTraining(item) {
    item.IsEdited = true;
  }
  SaveEditTraining(item) {
    item.IsEdited = false;
  }
  PreviousClick() {
    this.userProfile = JSON.parse(sessionStorage.getItem("UserProfile"));
    this.userProfile.TrainingData = this.trainings;
    sessionStorage.setItem("UserProfile", JSON.stringify(this.userProfile));
  }

  NextClick() {
    this.userProfile = JSON.parse(sessionStorage.getItem("UserProfile"));
    this.userProfile.TrainingData = this.trainings;
    sessionStorage.setItem("UserProfile", JSON.stringify(this.userProfile));
  }

}
