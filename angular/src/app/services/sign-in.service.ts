import { Injectable } from '@angular/core';
import {Http} from '@angular/http';


import { Headers, RequestOptions } from '@angular/http';


@Injectable()
export class SignInService {

  constructor(private http:Http) { }



  check(alias:string,passwd:string){
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    // url for node server: localhost:3000/api/auth

    return this.http.post('http://localhost:8080/auth', { alias:alias,passwd:passwd }, options)
                    .map(res => res.json());
  }
}
