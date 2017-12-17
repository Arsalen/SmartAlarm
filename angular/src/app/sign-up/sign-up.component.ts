import { Component, OnInit } from '@angular/core';

import {SignUpService} from '../services/sign-up.service';
import {Router} from "@angular/router";
import {UserService} from "../_services/user.service";
import {AlertService} from "../_services/alert.service";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
  providers:[SignUpService]
})
export class SignUpComponent implements OnInit {
  model: any = {};
  loading = false;
  private errMessage : string;
  private successMessage : string;

  constructor(
    private signUpService : SignUpService,
    private router: Router,
    private userService: UserService,
    private alertService: AlertService) { }

  private nom:string;
  private email:string;
  private date_naissance:string;
  private addresse:string;
  private num_tel:string;
  private cin:string;
  private status:string;
  private titre:string;
  private alias:string;
  private passwd:string;
  private pos_actuelle:string;


  ngOnInit() {
//  curl.exe -X POST -H 'Content-Type: application/json' -H 'Authorization: Bearer ' -d '{"nom":"Xiyao","status":"Owner","username":"Xiyao","password":"$2a$08$lDnHPz7eUkSi6ao14Twuau08mzhWrL4kyZGGU5xfiGALO/Vxd5DOi1","song":1,"fcmtoken":"cHbNF1c76yc:APA91bF2j37L86mcvvv2eYmzxGbvFdAKmEn7QM9XOo--cXNfnK28jTz0VioouP-My9hLLLobUB-A14qM2dEejU3PKni4mQGeWghzcBHCKULG8g3O1QKA0RHCKp9WglH8ieGETy4CYBUi","prenom":"Chan","email":"arsalen.hagui.ensi@gmail.com","enabled":1,"lastPasswordResetDate": "2017-08-24T23:00:42"}' 'http://localhost:8080/users/register' -i

//    {
//    nom:"Xiyao",
//    status:"Owner",
//    username:"Xiyao",
//    password:"$2a$08$lDnHPz7eUkSi6ao14Twuau08mzhWrL4kyZGGU5xfiGALO/Vxd5DOi1",
//    song:1,
//    fcmtoken:"cHbNF1c76yc:APA91bF2j37L86mcvvv2eYmzxGbvFdAKmEn7QM9XOo--cXNfnK28jTz0VioouP-My9hLLLobUB-A14qM2dEejU3PKni4mQGeWghzcBHCKULG8g3O1QKA0RHCKp9WglH8ieGETy4CYBUi",
//    prenom:"Chan",
//    email:"arsalen.hagui.ensi@gmail.com",
//    enabled:1,
//    lastPasswordResetDate: "2017-08-24T23:00:42"
//    }
  }


  register() {
    this.loading = true;
    this.model.enabled = 0;
    this.model.lastPasswordResetDate = new Date();
    this.model.status = 'Propriétaire';
    this.model.song = 1;
    this.model.fcmtoken = 'cHbNF1c76yc:APA91bF2j37L86mcvvv2eYmzxGbvFdAKmEn7QM9XOo--cXNfnK28jTz0VioouP-My9hLLLobUB-A14qM2dEejU3PKni4mQGeWghzcBHCKULG8g3O1QKA0RHCKp9WglH8ieGETy4CYBUi';
    console.log(this.model);



    if(this.model.nom == undefined || this.model.prenom == undefined || this.model.username == undefined || this.model.password == undefined || this.model.email == undefined ){
      this.errMessage = 'Remplir tous les champs'
    }else{
      this.errMessage = null
      this.userService.create(this.model)
      .subscribe(
        data => {
          this.successMessage = 'Utilisateur bien ajouté'
          //this.alertService.success('Compte créé avec Succès', true);
          this.router.navigate(['/connextion']);
          console.log('data: '+data)
        },
        error => {
          this.errMessage = 'erreur: Alias ou mot de passe existe dèjà  '
          //this.errMessage = 'error while adding data '
          //this.alertService.error('Cette adresse mail est déja utilisée !');
          this.loading = false;
          console.log('erreur lors d\'inscription')
        });
    }
  }

  logFormData(){
    console.log(this.nom);
    let jsonObj = {
      nom_prenom:this.nom,
      date_naissance:this.date_naissance,
      email:this.email,
      numero_tel:[this.num_tel],   /**this might cause some problems */
      passwd:this.passwd,
      titre:this.titre,
      status:this.status,
      adresse:this.addresse,
      alias:this.alias,
      num_cin:this.cin,
      position_actuelle:this.pos_actuelle
    }

    this.signUpService.send_request(jsonObj)
    .subscribe(server_responce => console.log('request sent to server'));
  }

  redirectTo(){
    this.router.navigate(['/connexion']);
  }


}
