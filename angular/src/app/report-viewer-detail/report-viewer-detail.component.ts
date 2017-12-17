import { Component, OnInit } from '@angular/core';
import {Article} from '../entities/article';
import {ArticleService} from '../services/article.service';
import {ActivatedRoute,Params} from '@angular/router';

import 'rxjs/add/operator/switchMap';


@Component({
  selector: 'app-report-viewer-detail',
  templateUrl: './report-viewer-detail.component.html',
  styleUrls: ['./report-viewer-detail.component.css'],
  providers:[ArticleService]
})
export class ReportViewerDetailComponent implements OnInit {

  private article : Article;

  constructor(private articleService : ArticleService,
              private route : ActivatedRoute
  ) {}



  ngOnInit() {  
    this.route.params
    .switchMap((params:Params) => this.articleService.getArticle(+params['id']))
    .subscribe(article => this.article = article);
  }
}
