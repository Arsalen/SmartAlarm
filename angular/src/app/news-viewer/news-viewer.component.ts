import { Component, OnInit } from '@angular/core';
import {NewsService} from '../services/news.service';
import {News } from '../entities/news';

@Component({
  selector: 'app-news-viewer',
  templateUrl: './news-viewer.component.html',
  styleUrls: ['./news-viewer.component.css'],
  providers:[NewsService]
})
export class NewsViewerComponent implements OnInit {

  private news : News[];
  constructor(private newsService : NewsService) {

  }

  ngOnInit() {
    this.newsService.getNews()
    .subscribe(news => this.news = news);
  }

}
