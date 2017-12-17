import {Component, Input, OnInit} from '@angular/core';
import {AuthenticationService} from "../../../_services/authentication.service";
import {Router} from "@angular/router";


@Component({
    templateUrl: 'home.component.html',
  styleUrls:['./home.component.css']
})

export class HomeComponent {
  //@Input() psw: string;
  //console.log(psw);
  shadow = "true";
  constructor(
    private router: Router,
    private authServ : AuthenticationService
  ) {}
 // logout() {
   // this.authServ.logout();
    //this.shadow = "false";
    //this.changeshadow();
  //}
  logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
      this.router.navigate(['/connexion']);

    }
  changeshadow():string{
    return this.shadow;
  }
}
