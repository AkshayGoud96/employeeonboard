import { Component, OnInit } from '@angular/core';
import { TrainingData } from '../TrainingData';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit {

  training:TrainingData;
  trainings:Array<TrainingData>=[];
  constructor() { }

  ngOnInit() {
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

}
