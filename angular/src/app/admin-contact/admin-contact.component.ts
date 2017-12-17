import { Component, OnInit } from '@angular/core';
import {AdminContactService} from '../services/admin-contact.service';

@Component({
  selector: 'app-admin-contact',
  templateUrl: './admin-contact.component.html',
  styleUrls: ['./admin-contact.component.css'],
  providers:[AdminContactService]
})
export class AdminContactComponent implements OnInit {

  private nom:string;
  private email:string;
  private message:string;

  constructor(private adminContactService : AdminContactService) { }

  sendData(){
    console.log('im supposed to send your data now');

    //prepare the json object to be sent
    let jsonObj = {
      nom:this.nom,
      email:this.email,
      message:this.message
    };

    this.adminContactService.sendMessageToAdmin(jsonObj)
    .subscribe(() => console.log('post request send just fine'));

  }

  ngOnInit() {

  }
}
