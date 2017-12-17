import { Injectable } from '@angular/core';
import {Commentaire } from '../entities/commentaire';

import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';


//for post resquests
import { Headers, RequestOptions } from '@angular/http';








@Injectable()
export class CommentaireService {

  //try adding http:// if the post request is not working fin
  private urlCommentaireForum = "http://localhost:3000/api/commentaires_forums";

  private urlCommentairesArticles = "http://localhost:3000/api/commentaires_articles";


  constructor(private http: Http) { }


  getCommentairesByIdForum(id_forum:number){
    let url = `${this.urlCommentaireForum}/${id_forum}`;
    return this.http.get(url).map(res => res.json());
  }



  getCommentairesByIdArticle(id_article:number){
    let url = `${this.urlCommentairesArticles}/${id_article}`;
    this.http.get(url).map(res => res.json());
  }

  //add a comment to to forum
  addComment(jsonObj,id_forum:number){
    let headers = new Headers({'Content-Type':'application/json'});
    let options = new RequestOptions({headers:headers});
    
    return this.http.post(this.urlCommentaireForum,jsonObj,options)
    .map(res => res.json());
  }


}
