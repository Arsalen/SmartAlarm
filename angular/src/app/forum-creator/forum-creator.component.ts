import { Component, OnInit } from '@angular/core';
import {ForumCreatorService} from '../services/forum-creator.service';


class FormRequest{
  nom:string;
  email:string;
  numero:number;
  sujet:string;
  contenue:string;
}


@Component({
  selector: 'app-forum-creator',
  templateUrl: './forum-creator.component.html',
  styleUrls: ['./forum-creator.component.css'],
  providers:[ForumCreatorService]
})
export class ForumCreatorComponent implements OnInit {

  private form:FormRequest;

  constructor(private forumCreatorService : ForumCreatorService) { }


  ngOnInit() {

    this.form.nom ="";
    this.form.email="";
    this.form.numero=0;
    this.form.sujet="";
    this.form.contenue="";
  }

  test(){
    console.log('in here');
    console.log(this.form.numero + this.form.nom);
  }

  heree(){
    console.log('fuck');
  }

}