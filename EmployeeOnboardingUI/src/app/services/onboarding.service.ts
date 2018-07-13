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

  SaveData(data):Observable<any>
  {
    return this.httpClient.post(environment.api+'api/Onboarding/SaveData',data);
  }

  GetProfileData(email):Observable<any>
  {
    return this.httpClient.get(environment.api+'api/Onboarding/GetProfileData?email='+email);
  }

}
