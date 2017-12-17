import { Component, OnInit } from '@angular/core';
import {Forum} from '../entities/forum';
import {ForumService} from '../services/forum.service';
import {Router } from '@angular/router';


@Component({
  selector: 'app-forums-viewer',
  templateUrl: './forums-viewer.component.html',
  styleUrls: ['./forums-viewer.component.css'],
  providers:[ForumService]
})
export class ForumsViewerComponent implements OnInit {

  private forums : Forum[];
  constructor(private forumService : ForumService,
              private router:Router) { }

  ngOnInit() {
    this.forumService.getForums()
    .subscribe(forums => this.forums = forums);
  }

  public gotToProp(){
    console.log('re-routing to form proposition');
    this.router.navigate(['/forumcreation'/*,no parameter is required for this route*/]);
  }

}
