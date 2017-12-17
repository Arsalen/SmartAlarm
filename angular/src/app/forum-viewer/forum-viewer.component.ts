import { Component, OnInit } from '@angular/core';
import {ForumService} from '../services/forum.service';
import {Forum} from '../entities/forum';
import {CommentaireService} from '../services/commentaire.service';
import {Commentaire } from '../entities/commentaire';
import {ActivatedRoute,Params} from '@angular/router';



import 'rxjs/add/operator/switchMap';


@Component({
  selector: 'app-forum-viewer',
  templateUrl: './forum-viewer.component.html',
  styleUrls: ['./forum-viewer.component.css'],
  providers:[ForumService,CommentaireService]
})
export class ForumViewerComponent implements OnInit {

  private forum : Forum;
  private forumId:number;
  private commentaires : Commentaire[];
  constructor(private forumService: ForumService,
              private route : ActivatedRoute,
              private commentaireService :CommentaireService
              ) { }

  private commentaire:string;
  private email:string;
  private nom:string;

  ngOnInit() {
    //get the form id from the route parameters and go ask the service for that particular forum
    this.route.params
    .switchMap((params : Params) => this.forumService.getForum(+params['id']))
    .subscribe(forum => this.forum = forum);

    //get comments
    this.route.params
    .switchMap((params:Params) => this.commentaireService.getCommentairesByIdForum(+params['id']))
    .subscribe(commentaires => this.commentaires = commentaires);


    //save the forum id (needed when adding a comment to this forum)
    this.forumId = +this.route.snapshot.params['id'];
  }

  logFormValues(){
    
    let jsonObj = {
      nom:this.nom,
      email:this.email,
      commentaire:this.commentaire
    };

    this.commentaireService.addComment(jsonObj,this.forumId)
    .subscribe(serverResponse => console.log('^post done successfully'));

  }
}