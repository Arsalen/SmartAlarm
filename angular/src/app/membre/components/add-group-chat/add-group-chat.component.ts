import { Component, OnInit } from '@angular/core';

import {Router} from '@angular/router';

import {Member} from '../../entities/member';
import {MembersService} from '../../services/members.service';



@Component({
  selector: 'app-add-group-chat',
  templateUrl: './add-group-chat.component.html',
  styleUrls: ['./add-group-chat.component.css'],
  providers:[MembersService]
})
export class AddGroupChatComponent implements OnInit {

  constructor(private router:Router,
              private membersService:MembersService) { }


 private members:Member[];
 private selectedMembers:Member[] = [];
 private index;

  ngOnInit() {
    this.membersService.getMembers().subscribe(res => {this.members = res;
       
    }); 
  }


select_member(member:Member){
  this.selectedMembers.push(member);
}

  not_ready_component(){
    this.router.navigate(['/not_ready']);
  }

}
