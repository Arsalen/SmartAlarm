import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

import {Member} from '../../entities/member';
import {Message} from '../../entities/message';


import {TchatService} from '../../services/tchat.service';
import {MembersService} from '../../services/members.service';
import {IdService} from '../../services/id.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
  providers:[TchatService,MembersService]
})
export class ChatComponent implements OnInit {

  private members: Member[];
  private selected_member:Member;   //corrent selected member to tchat with
  private messages: Message[];      //corrent selected conversation
  private msg = "";
  private id:number; //user id

  constructor(private router : Router,
              private tchatService : TchatService,
              private membersService:MembersService,
              private idService:IdService) { }

  ngOnInit() {
    this.membersService.getMembers().subscribe(members => {
      this.members = members;
      this.selected_member = this.members[0];
      // get conversation with the first member in the table
      this.tchatService.get_conversation(this.idService.getId(),this.selected_member.id_membre)
      .subscribe(messages=> this.messages = messages);

      this.id = this.idService.getId();
  });
  }

  say(){

    console.log(this.idService.getId());  
  }

  test(){
    console.log(this.selected_member);
  }


  render_conversation(member:Member){
    this.selected_member = member;
    this.tchatService.get_conversation(this.idService.getId(),this.selected_member.id_membre)
    .subscribe(messages => this.messages = messages);
  }

  send_new_message(){

    // console.log('in here' + this.msg);
    this.tchatService.send_message(this.id,this.selected_member.id_membre,this.msg)
    .subscribe(reponce => {this.messages.push( new Message(this.msg,'conversation-left')  )});
    }

  addgroupe(){
    this.router.navigate(['addgroupechat']);
  }

  jja(){


}}
