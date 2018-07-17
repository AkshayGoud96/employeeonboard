import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  data: any;
  private notify = new Subject<any>();
  /**
   * Observable string streams
   */
  notifyObservable$ = this.notify.asObservable();

  constructor(){}

  public notifyOther(data: any) {
    if (data) {
      this.notify.next(data);
    }
  }

setData(data:any){
this.data = data;
}

getData(){
  return this.data;
}


}