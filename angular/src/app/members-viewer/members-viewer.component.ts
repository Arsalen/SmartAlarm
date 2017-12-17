import { Component, OnInit } from '@angular/core';
import {Member } from '../entities/member';
import {MemberServiceService} from '../services/member-service.service';


import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';


class Time{
  time:string;
}

@Component({
  selector: 'app-members-viewer',
  templateUrl: './members-viewer.component.html',
  styleUrls: ['./members-viewer.component.css'],
  providers:[MemberServiceService]
})
export class MembersViewerComponent implements OnInit {

  private members:Member[];
  private times:Time[];

  constructor(private memberService : MemberServiceService) {

   }


  ngOnInit() {
      this.memberService.getMembers()
      .subscribe(members => this.members = members);  
  }

}
