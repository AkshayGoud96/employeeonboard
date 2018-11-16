import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OnboardingService {

  constructor(private httpClient:HttpClient) { }

  VerifyUser(email,name):Observable<any>
  {
    return this.httpClient.get(environment.api+'api/Onboarding/VerifyUser?email='+email+'&name='+name);
  }

  VerifyAdmin(email, password):Observable<any>
  {
    return this.httpClient.get(environment.api+'api/Onboarding/VerifyAdmin?email='+email+'&password='+password);
  }

  LoginAccess(index):Observable<any>
  {
    return this.httpClient.get(environment.api+'api/Onboarding/LoginAccess?index='+index);
  }

  GetAllUserData():Observable<any>
  {
    return this.httpClient.get(environment.api+'api/Onboarding/GetAllUserData');
  }

  DeleteData(dataid, empid, table):Observable<any>
  {
    return this.httpClient.get(environment.api+'api/Onboarding/DeleteData?dataid='+dataid+'&empid='+empid+'&table='+table);
  }

  SaveData(data):Observable<any>  
  {
    return this.httpClient.post(environment.api+'api/Onboarding/SaveData',data);
  }

  GetProfileData(email):Observable<any>
  {
    return this.httpClient.get(environment.api+'api/Onboarding/GetProfileData?emailId='+email);
  }

  GetFiles(email):Observable<any>
  {
      return this.httpClient.get(environment.api+'api/Onboarding/GetFiles?email='+email)
  }

  GetFileName(fileid):Observable<any>
  {
      return this.httpClient.get(environment.api+'api/Onboarding/GetFileName?fileid='+fileid)
  }

  DownloadFile(data, empid):Observable<any>
  {
      return this.httpClient.get(environment.api+'api/Onboarding/DownloadFile?data='+data+'&empid='+empid, {responseType: 'arraybuffer'})
  }

  CreateUserProfile(email, name):Observable<any>
  {
    return this.httpClient.get(environment.api+'api/Onboarding/CreateUserProfile?email='+email+'&name='+name);
  }

  UploadFile(data):Observable<any>
  {
    
    return this.httpClient.post(environment.api+'api/Onboarding/UploadFile', data);
  }


  SubmitData():Observable<any>
  {
    let formData:FormData=new FormData();
    formData.append("Email",sessionStorage.getItem("Email"));
    return this.httpClient.post(environment.api+'api/Onboarding/SubmitData',formData);
  }
}
