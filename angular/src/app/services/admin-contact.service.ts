import { Injectable } from '@angular/core';


import { Headers, RequestOptions } from '@angular/http';

import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';



@Injectable()
export class AdminContactService {

  constructor(private http : Http) { }

  private post_url = "http://localhost:3000/api/send_message_to_admin";

  sendMessageToAdmin(jsonObj){
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    console.log('message frm the personne contact service');

    return this.http.post(this.post_url,jsonObj,options)
    .map(res => res.json());

  }
}
