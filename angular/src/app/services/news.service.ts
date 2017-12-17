import { Injectable } from '@angular/core';
import {News } from '../entities/news';


import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';

@Injectable()
export class NewsService {

  private newsUrl = "http://localhost:3000/api/news";
  

  constructor(private http:Http) { }


  getNews(): Observable<News[]> {
        return this.http.get(this.newsUrl)
        .map(res => res.json());
    }




}
