import { Injectable } from '@angular/core';
import {Forum} from '../entities/forum';

import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';



import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';


@Injectable()
export class ForumService {

  constructor(private http: Http) { }

  private forumsUrl = "http://localhost:3000/api/forums";

  getForums(){
    return this.http.get(this.forumsUrl)
    .map(res => res.json());
  }

  getForum(id:number){
    const url = `${this.forumsUrl}/${id}`;
    return this.http.get(url)
    .map(res => res.json());
  }

}
