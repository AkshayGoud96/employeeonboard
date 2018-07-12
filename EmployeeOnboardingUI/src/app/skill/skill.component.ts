import { Component, OnInit } from '@angular/core';
import {TechnicalSkillData} from '../SkillData';
import { FunctionalSkillData } from '../FunctionalSkillData';
@Component({
  selector: 'app-skill',
  templateUrl: './skill.component.html',
  styleUrls: ['./skill.component.css']
})
export class SkillComponent implements OnInit {

  skill:TechnicalSkillData;
 skills:Array<TechnicalSkillData>=[];
 functionalSkill:FunctionalSkillData;
 functionalSkills:Array<FunctionalSkillData>=[];
  constructor() { }

  ngOnInit() {

    if(sessionStorage.getItem("TechnicalSkills") !=undefined)
    {
    this.skills=JSON.parse(sessionStorage.getItem("TechnicalSkills"));
    }
    if(sessionStorage.getItem("FunctionalSkills") !=undefined)
    {
    this.functionalSkills=JSON.parse(sessionStorage.getItem("FunctionalSkills"));
    }

    this.skill = new TechnicalSkillData();
    this.skill.Skill="Select";
    this.skill.Expertise="Select";
    this.skill.LastWorkedOn="Select";
    this.skill.Type="Select";
    this.skill.IsEdited=false;


    this.functionalSkill = new FunctionalSkillData();
    this.functionalSkill.Skill="Select";
    this.functionalSkill.Expertise="Select";
    this.functionalSkill.LastWorkedOn="Select";
    this.functionalSkill.IsEdited=false;
  }

  AddSkill()
  {
    this.skills.push(this.skill);
    this.skill = new TechnicalSkillData();
    this.skill.Skill="Select";
    this.skill.Expertise="Select";
    this.skill.LastWorkedOn="Select";
    this.skill.Type="Select";
    this.skill.IsEdited=false;
  }
  DeleteSkill(index)
  {
    this.skills.splice(index,1);
  }
  EditSkill(item)
  {
   item.IsEdited=true;
  }
  SaveEditSkill(item)
  {
    item.IsEdited=false;
  }

  AddFunctionalSkill()
  {
    this.functionalSkills.push(this.functionalSkill);
    this.functionalSkill = new FunctionalSkillData();
    this.functionalSkill.Skill="Select";
    this.functionalSkill.Expertise="Select";
    this.functionalSkill.LastWorkedOn="Select";
    this.functionalSkill.IsEdited=false;
  }
  DeleteFunctionalSkill(index)
  {
    this.functionalSkills.splice(index,1);
  }
  EditFunctionalSkill(item)
  {
   item.IsEdited=true;
  }
  SaveEditFunctionalSkill(item)
  {
    item.IsEdited=false;
  }

  PreviousClick()
  {
    sessionStorage.setItem("TechnicalSkills",JSON.stringify(this.skills));
    sessionStorage.setItem("FunctionalSkills",JSON.stringify(this.functionalSkills));
  }

  NextClick()
  {
    sessionStorage.setItem("TechnicalSkills",JSON.stringify(this.skills));
    sessionStorage.setItem("FunctionalSkills",JSON.stringify(this.functionalSkills));
  }

}
