import { Component, OnInit } from '@angular/core';
import { TechnicalSkillData } from '../SkillData';
import { FunctionalSkillData } from '../FunctionalSkillData';
import { UserProfile } from '../UserProfile';
import { CommonService } from '../services/commonservice.service';
import { Subscription } from 'rxjs';
import { OnboardingService } from '../services/onboarding.service';
@Component({
  selector: 'app-skill',
  templateUrl: './skill.component.html',
  styleUrls: ['./skill.component.css']
})
export class SkillComponent implements OnInit {

  skill: TechnicalSkillData;
  skills: Array<TechnicalSkillData> = [];
  functionalSkill: FunctionalSkillData;
  functionalSkills: Array<FunctionalSkillData> = [];
  userProfile: UserProfile;
  submitted: string;
  subscription: Subscription;
  constructor(private commonService: CommonService,private onboardingService:OnboardingService) { }

  ngOnInit() {
    this.subscription = this.commonService.notifyObservable$.subscribe((res) => {
      if (res.hasOwnProperty('option') && res.option === 'get') {
        this.skills = JSON.parse(sessionStorage.getItem("UserProfile")).TechnicalSkillData;
        this.functionalSkills = JSON.parse(sessionStorage.getItem("UserProfile")).FunctionalSkillData;

      }
    });
    this.submitted = sessionStorage.getItem("Submitted");
    if (sessionStorage.getItem("UserProfile") != undefined) {
      let technicalSkills = JSON.parse(sessionStorage.getItem("UserProfile")).TechnicalSkillData;
      if (technicalSkills != undefined) {
        this.skills = technicalSkills;
      }
    }
    if (sessionStorage.getItem("UserProfile") != undefined) {
      let functionalSkills = JSON.parse(sessionStorage.getItem("UserProfile")).FunctionalSkillData;
      if (functionalSkills != undefined) {
        this.functionalSkills = functionalSkills;
      }
    }

    this.skill = new TechnicalSkillData();
    this.skill.Skill = "Select";
    this.skill.Expertise = "Select";
    this.skill.LastWorkedOn = "Select";
    this.skill.Type = "Select";
    this.skill.IsEdited = false;


    this.functionalSkill = new FunctionalSkillData();
    this.functionalSkill.Skill = "Select";
    this.functionalSkill.Expertise = "Select";
    this.functionalSkill.LastWorkedOn = "Select";
    this.functionalSkill.IsEdited = false;
  }

  AddSkill() {
    this.skills.push(this.skill);
    this.skill = new TechnicalSkillData();
    this.skill.Skill = "Select";
    this.skill.Expertise = "Select";
    this.skill.LastWorkedOn = "Select";
    this.skill.Type = "Select";
    this.skill.IsEdited = false;
  }
  DeleteSkill(index) {
    this.skills.splice(index, 1);
  }
  EditSkill(item) {
    item.IsEdited = true;
  }
  SaveEditSkill(item) {
    item.IsEdited = false;
  }

  AddFunctionalSkill() {
    this.functionalSkills.push(this.functionalSkill);
    this.functionalSkill = new FunctionalSkillData();
    this.functionalSkill.Skill = "Select";
    this.functionalSkill.Expertise = "Select";
    this.functionalSkill.LastWorkedOn = "Select";
    this.functionalSkill.IsEdited = false;
  }
  DeleteFunctionalSkill(index) {
    this.functionalSkills.splice(index, 1);
  }
  EditFunctionalSkill(item) {
    item.IsEdited = true;
  }
  SaveEditFunctionalSkill(item) {
    item.IsEdited = false;
  }

  PreviousClick() {
    this.userProfile = JSON.parse(sessionStorage.getItem("UserProfile"));
    if (this.skills != []) {
      this.userProfile.TechnicalSkillData = this.skills;
    }
    if (this.functionalSkills != []) {
      this.userProfile.FunctionalSkillData = this.functionalSkills;
    }
    this.userProfile.FunctionalSkillData = this.functionalSkills;
    sessionStorage.setItem("UserProfile", JSON.stringify(this.userProfile));
  }

  NextClick() {
    this.userProfile = JSON.parse(sessionStorage.getItem("UserProfile"));
    this.userProfile.TechnicalSkillData = this.skills;
    this.userProfile.FunctionalSkillData = this.functionalSkills;
    sessionStorage.setItem("UserProfile", JSON.stringify(this.userProfile));
  }

}
