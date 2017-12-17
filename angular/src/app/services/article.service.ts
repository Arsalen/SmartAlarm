import { Injectable } from '@angular/core';
import {Article} from '../entities/article';

import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';





  @Injectable()
  export class ArticleService {
    
 private articlesUrl ="http://localhost:3000/api/articles" ;

  getArticles(){
      return this.http.get(this.articlesUrl)
      .map(res => res.json());
  }

  getArticle(id:number){
      const url = `${this.articlesUrl}/${id}`;
      return this.http.get(url)
      .map(res => res.json());
  }

  constructor(private http: Http) { }

}
