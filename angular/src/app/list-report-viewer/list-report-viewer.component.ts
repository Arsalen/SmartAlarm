import { Component, OnInit } from '@angular/core';
import {ArticleService} from '../services/article.service';
import {Article} from '../entities/article';

@Component({
  selector: 'app-list-report-viewer',
  templateUrl: './list-report-viewer.component.html',
  styleUrls: ['./list-report-viewer.component.css'],
  providers:[ArticleService]
})
export class ListReportViewerComponent implements OnInit {

  private articles : Article[];
  constructor(private articleService : ArticleService) { }

  ngOnInit() {
    this.articleService.getArticles()
    .subscribe(articles=> this.articles = articles );
  }
}