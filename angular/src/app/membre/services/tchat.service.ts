import { Injectable } from '@angular/core';


import {Message} from '../entities/message';
import {Inbox} from '../entities/inbox';

import { Http, Response,Headers, RequestOptions  } from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class TchatService {

  private msgUrl = "http://localhost:3000/api/messages";
  private new_message_url = "http://localhost:3000/api/new_message";
  constructor(private http:Http) { }

  send_message(id:number,id_dest:number,msg:string){
    // objet message a envoyer
    let jsonObj = {id_source:id,id_destination:id_dest,contenue:msg};
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    
    return this.http.post(this.new_message_url,jsonObj,options).map(res => res.json());
  }


  get_conversation(idSource:number,idDest:number){
    let jsonRequest = {
      id_source:idSource,
      id_dest:idDest
    };
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(this.msgUrl,jsonRequest,options)
    .map(res => res.json());
  }


  check_inbox(){
    return this.http.get(this.msgUrl).map(res => res.json());
  }

}



