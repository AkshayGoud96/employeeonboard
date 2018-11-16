import { Component, OnInit } from '@angular/core';
import { AdditionalDetailsData } from '../AdditionalDetailsData';
import {FileSaver} from 'file-saver';
import { UserProfile } from '../UserProfile';
import { FileData } from '../FileData';
import { OnboardingService } from '../services/onboarding.service';
import { CommonService } from '../services/commonservice.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LTextNode } from '@angular/core/src/render3/interfaces/node';
import { VariableAst } from '@angular/compiler';
import { Form } from '@angular/forms';
import { Url } from 'url';

@Component({
  selector: 'app-additionaldetails',
  templateUrl: './additionaldetails.component.html',
  styleUrls: ['./additionaldetails.component.css']
})
export class AdditionaldetailsComponent implements OnInit {

  downfile: string;
  fileUrl: string;
  file: File;
  email: string;
  fileDesc: string;
  fileType: string;
  experience: string;
  userProfile: UserProfile;
  submitted: string;
  uploadedFiles: Array<FileData> = [];
  subscription: Subscription;
  constructor(private onboardingService: OnboardingService, private commonService: CommonService, private router: Router) { }

  ngOnInit() {
    this.email = sessionStorage.getItem("Email");
    this.onboardingService.GetFiles(this.email).subscribe(
      resp => {
        this.uploadedFiles = resp;
      }
    );
  }

  PreviousClick() {
    
  }
  
  NextClick()
  {
      
  }

 
 Selectfile(event)
  {
    let files = event.target.files;
    this.file=files[0];
  }

  Uploadfile()
  {
    let formData: FormData = new FormData();
    formData.append("File", this.file, this.file.name);
    formData.append("Filedesc", this.fileDesc);
    formData.append("Email", this.email);
    formData.append("Filetype", this.fileType);
    this.onboardingService.UploadFile(formData).subscribe(
      res=>{
        alert("Uploaded Successfully");
        this.uploadedFiles = res;
      }
    );
  }

  DeleteFile(item, index, table) {
    var confirmResult = confirm("Are you sure you want to delete ?");
    if(confirmResult)
    {
    var data = this.uploadedFiles.find(d => d.UPID == item.UPID);
    this.onboardingService.DeleteData(data.FID, data.UPID, table).subscribe();
    this.uploadedFiles.splice(index, 1);
    }
  }

  Downloadfile(item)
  {
    
  this.onboardingService.DownloadFile(item.FID, item.UPID).subscribe(
    res => {
       var binaryData = [];
      binaryData.push(res);
      this.fileUrl = window.URL.createObjectURL(new Blob(binaryData, {type: "octet/stream"  }))
      this.onboardingService.GetFileName(item.FID).subscribe(
        res=>
        {
          if (window.navigator && window.navigator.msSaveOrOpenBlob) {
            window.navigator.msSaveOrOpenBlob(new Blob(binaryData, {type: "octet/stream"  }), res);
          } else {
          var anchor = document.createElement("a");
          anchor.download = res;
          anchor.href = this.fileUrl;
          anchor.click(); 
          }
        }
      );
     
    }
  );
  }
}
