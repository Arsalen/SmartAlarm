import { Component, OnInit } from '@angular/core';
import  {ActivatedRoute, Router} from '@angular/router';
import {SignInService} from '../services/sign-in.service';
import {AlertService} from "../_services/alert.service";
import {AuthenticationService} from "../_services/authentication.service";



class AuthResponce{
  res:string;
}



@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
  providers:[SignInService]
})
export class SignInComponent implements OnInit {

  model: any = {};
  loading = false;
  returnUrl: string;

  private alias:string;
  private passwd:string;
  private errMessage : string;
  private successMessage : string;

  constructor(
   // private router : Router,
    private signInService : SignInService,  ////////::----------///////:
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private alertService: AlertService) { }





  ngOnInit() {

     // reset login status
     this.authenticationService.logout();

     // get return url from route parameters or default to '/'
     this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/accueil';


  }

redirect(id:string){

}

private ac : AuthResponce;



  login() {
    this.loading = true;
    console.log(this.model.username);
    this.authenticationService.login(this.model.username, this.model.password)
      .subscribe(
        data => {
          this.router.navigate(['/home']);
          this.errMessage = '';
          this.successMessage = 'Authentification reussite, connextion en cour ..';

        },
        error => {
          this.errMessage = 'Verifier votre alias ou votre mot de passe!';
          this.alertService.error('Nom ou/et Mot de passe incorrect');
          this.loading = false;
        });
  }

  submit(){
    this.signInService.check(this.alias,this.passwd)
    .subscribe(res => {
      if(res.res == "authorized"){
        this.errMessage = '';
        this.successMessage = 'Authentification reussite, connextion en cour ..';
        setTimeout(function(){
          console.log('redirecting now  ' );
          let url:string =  "http://localhost:4201/welcome/" + res.id;
          console.log(url);
          window.location.href = url;
        },1000);
      }else{
        console.log('you do not have acceess');
        this.errMessage = 'Verifier votre alias ou votre mot de passe!';
      }
    });
  }

  redirectTo(){
    this.router.navigate(['/inscription']);
  }
}
