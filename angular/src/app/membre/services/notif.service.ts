import { Injectable } from '@angular/core';
import {Notif} from '../entities/notif';



import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';






@Injectable()
export class NotifService {




    // spring url:    http://192.168.1.3:8080/notifications

    private notifUrl = "http://localhost:3000/api/notifications";

    constructor(private http : Http) { }


    getNotifications(){
      return this.http.get(this.notifUrl).map(res => res.json());
    }


}
