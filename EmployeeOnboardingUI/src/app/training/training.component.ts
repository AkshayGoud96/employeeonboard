import { Component, OnInit } from '@angular/core';
import { TrainingData } from '../TrainingData';
import { UserProfile } from '../UserProfile';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit {

  training:TrainingData;
  trainings:Array<TrainingData>=[];
  userProfile:UserProfile;
  constructor() { }

  ngOnInit() {
    debugger;
    if(sessionStorage.getItem("UserProfile") !=undefined)
    {
    this.trainings=JSON.parse(sessionStorage.getItem("UserProfile")).TrainingData;
    }
    this.training = new TrainingData();
    this.training.Category="Select";
  }

  AddTraining() {
    debugger;
    this.trainings.push(this.training);
    this.training = new TrainingData();
    this.training.Category="Select";
    this.training.IsEdited=false;
  }

  DeleteTraining(index)
  {
    this.trainings.splice(index,1);
  }
  EditTraining(item)
  {
   item.IsEdited=true;
  }
  SaveEditTraining(item)
  {
    item.IsEdited=false;
  }
  PreviousClick()
  {
    this.userProfile=JSON.parse(sessionStorage.getItem("UserProfile"));
    this.userProfile.TrainingData=this.trainings;
    sessionStorage.setItem("UserProfile", JSON.stringify(this.userProfile));
  }

  NextClick()
  {
    this.userProfile=JSON.parse(sessionStorage.getItem("UserProfile"));
    this.userProfile.TrainingData=this.trainings;
    sessionStorage.setItem("UserProfile", JSON.stringify(this.userProfile));
  }

}
