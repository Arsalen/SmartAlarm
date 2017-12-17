import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import {Http,Response } from '@angular/http';

class Time{
  time:string;
  milliseconds_since_epoch:number;
  date:string;
}


@Injectable()
export class TestServiceTimeService {


constructor(private http : Http) { }


 getTime():Observable<Time>{
   console.log('in here');
   return this.http.get('http://localhost:3000/api/time')
   .map(res => res.json())
   .catch(this.handleError);
 }


private handleError (error: Response | any) {
  // In a real world app, we might use a remote logging infrastructure
  let errMsg: string;
  if (error instanceof Response) {
    const body = error.json() || '';
    const err = body.error || JSON.stringify(body);
    errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
  } else {
    errMsg = error.message ? error.message : error.toString();
  }
  console.error(errMsg);
  return Observable.throw(errMsg);
}


   private extractData(res: Response) {
    let body = res.json();
    return body.data || {} ;
  }


  

}
