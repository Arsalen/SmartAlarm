import {Component, Input, OnInit} from '@angular/core';

import {ProfileService} from '../../services/profile.service';
import {UserService} from "../../../_services/user.service";
import {User} from "../../../_models/user";
import { Location } from '@angular/common';
import {consoleTestResultHandler} from "tslint/lib/test";
import {AuthenticationService} from "../../../_services/authentication.service";
import {Router} from "@angular/router";


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers:[ProfileService]
})
export class ProfileComponent implements OnInit {

  @Input() profile: User;


  isLoaded = false;
 // profile:User;
  progres:number;
  currentUserCookies: User;
  currentUser = JSON.parse(localStorage.getItem('currentUser'));
  defaultToken : string;
  private errMessage : string;
  private successMessage : string;

  constructor(
    private location: Location,
    private auth : AuthenticationService,
    private user_service : UserService,
    private router: Router,
    ) {
    this.currentUserCookies = JSON.parse(localStorage.getItem('currentUser'));
    console.log(this.currentUserCookies);
    var obj = this.currentUser;
    this.defaultToken = obj.token;
    console.log(obj.token);
   // this.token = this.currentUserCookies[1];
   // console.log(this.token);

  }

  ngOnInit() {
     this.loadCurrentUser();
  }

  private loadCurrentUser() {
    console.log(this.currentUserCookies.username);
    this.user_service.getByUsername(this.currentUserCookies.username).subscribe(
      user => {

        this.profile = user;
        this.isLoaded = true;
        console.log(this.profile);
        console.log('est chargé puisque '+ this.isLoaded);
      });
   }



  goBack(): void {
    this.location.back();
  }

  enregistrerModif(): void {
    console.log(this.profile);
    this.user_service.update(this.profile)
      .subscribe(
        data => {
          //this.router.navigate(['/home']);
          this.successMessage = 'votre modifications a été prise en compte'
          console.log(JSON.parse(localStorage.getItem('currentUser')));
          console.log(this.profile.username);
          console.log(this.profile.password);
        },
        error => {this.errMessage = 'votre modifications n\'a pas été prise en compte'}
        );
          console.log(JSON.parse(localStorage.getItem('currentUser')));


  }





}
