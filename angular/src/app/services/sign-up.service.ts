import { Injectable } from '@angular/core';

import {Http} from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';





@Injectable()
export class SignUpService {

  constructor(private http:Http) { }
  private sign_up_url = "http://localhost:8080/membres";

  send_request(jsonObj){
    let headers = new Headers({'Content-Type':'application/json'});
    let options = new RequestOptions({headers:headers});

    return this.http.post(this.sign_up_url,jsonObj,options)
    .map(res => res.json());
  }
}
