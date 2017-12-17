import {Component, OnInit, OnDestroy} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {PubSubService} from "../../../_services/pubSubService.service";
import {PersonneAutoriseeService} from "../../../_services/personne_autorisee.service";
import {slideInOutAnimation} from "../../../_animations/slide-in-out.animation";
import {User} from "../../../_models/user";
import {UserService} from "../../../_services/user.service";
import {PersonneAutorisee} from "../../../_models/personneAutorisee";
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

import {Subscription} from "rxjs/Subscription";

@Component({
  templateUrl: 'personne-add-edit.component.html',
//  animations: [slideInOutAnimation],
//  host: { '[@slideInOutAnimation]': '' }
})


export class PersonneAddEditComponent implements OnInit/*, OnDestroy */{

  private subscription: Subscription;
  ajouter = "Ajouter  une personne";
  modifier //= "Modifier  une personne";
  choixBouton = "Enregistrer";
  private personneCiblee : any = {};
  currentUserCookies : any;
  currentUserBody : any;
  days: any[] = []
  x: any;
  y: any;

  id: number;
  private sub: any;

  private errMessage : string;
  private successMessage : string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private personneService: PersonneAutoriseeService,
    private pubSubService: PubSubService,
    private userService: UserService) {

    this.currentUserCookies = JSON.parse(localStorage.getItem('currentUser'));
    this.successMessage = null
     this.errMessage = null
  }

  ngOnInit() {

  this.successMessage = null
     this.errMessage = null

  this.sub = this.route.params.subscribe(params => {
       this.id = +params['id'];
       this.userService.getById(this.id).subscribe(
        person => {console.log('fffffffffffffffffffff')
          this.x = person
          this.modifier = 'Modifier '+ this.x.nom + ' ' + this.x.prenom
        },
        error =>{
          console.log("errrrrrrror");
        }
      );
    });


    this.userService.getByUsername(this.currentUserCookies.username).subscribe(
        person => {console.log('fffffffffffffffffffff')
          this.y = person
        },
        error =>{
          console.log("errrrrrrror");
        }
      );
  }

/*    ngOnDestroy() { this.x = null
    // unsubscribe to ensure no memory leaks
//    this.subscription.unsubscribe();
console.log('addComponent')
    }   */

  loadPerson(id:number) {

  }

  a(){
//  console.log(JSON.stringify(this.y))
let testuser: any = {
    nom: this.y.nom,
    prenom: this.y.prenom,
    status: this.y.status,
    song: this.y.song,
    commentaire: this.y.commentaire,
    enabled: 0,
    prop: this.y.prop,
    username: this.y.nom,
    typeautorisation: this.y.type_autorisation,
    tempsautorisation: this.y.tempsautorisation,
    password: this.y.password,
    fcmtoken: this.y.fcmtoken,
    email: this.y.email,
    lastPasswordResetDate: this.y.lastPasswordResetDate,
  }

  this.userService.getByProp(JSON.stringify(this.y)).subscribe(
        data => {
          console.log(data)
        },
        error =>{
          console.log("errrrrrrror");
        }
      );
    //console.log(this.y)

  if(this.personneCiblee.sunday)
    this.days.push('Dimanche de'+ this.personneCiblee.startsunday + ' jusqu\'à ' + this.personneCiblee.endsunday)
  if(this.personneCiblee.monday)
    this.days.push('monday'+ this.personneCiblee.startmonday + ' jusqu\'à ' + this.personneCiblee.endmonday)
  if(this.personneCiblee.tuesday)
    this.days.push('Mardi de '+ this.personneCiblee.starttuesday + ' jusqu\'à ' + this.personneCiblee.endtuesday)
  if(this.personneCiblee.wednesday)
    this.days.push('Mercredi de '+ this.personneCiblee.startwednesday + ' jusqu\'à ' + this.personneCiblee.endwednesday)
  if(this.personneCiblee.thursday)
    this.days.push('Jeudi de '+ this.personneCiblee.startthursday + ' jusqu\'à ' + this.personneCiblee.endthursday)
  if(this.personneCiblee.friday)
    this.days.push('Vendredi de '+ this.personneCiblee.startfriday + ' jusqu\'à ' + this.personneCiblee.endfriday)
  if(this.personneCiblee.saturday)
    this.days.push('Samedi de '+ this.personneCiblee.startsaturday + ' jusqu\'à ' + this.personneCiblee.endsaturday)
    
  }

saveUpdatePersonne() {

this.successMessage = null
     this.errMessage = null

if(!this.x){ console.log("Add")
  this.days = []
    if(this.personneCiblee.sunday)
    this.days.push('Dimanche de'+ this.personneCiblee.startsunday + ' jusqu\'à ' + this.personneCiblee.endsunday)
  if(this.personneCiblee.monday)
    this.days.push('Lundi de '+ this.personneCiblee.startmonday + ' jusqu\'à ' + this.personneCiblee.endmonday)
  if(this.personneCiblee.tuesday)
    this.days.push('Mardi de '+ this.personneCiblee.starttuesday + ' jusqu\'à ' + this.personneCiblee.endtuesday)
  if(this.personneCiblee.wednesday)
    this.days.push('Mercredi de '+ this.personneCiblee.startwednesday + ' jusqu\'à ' + this.personneCiblee.endwednesday)
  if(this.personneCiblee.thursday)
    this.days.push('Jeudi de '+ this.personneCiblee.startthursday + ' jusqu\'à ' + this.personneCiblee.endthursday)
  if(this.personneCiblee.friday)
    this.days.push('Vendredi de '+ this.personneCiblee.startfriday + ' jusqu\'à ' + this.personneCiblee.endfriday)
  if(this.personneCiblee.saturday)
    this.days.push('Samedi de '+ this.personneCiblee.startsaturday + ' jusqu\'à ' + this.personneCiblee.endsaturday)
    console.log(this.days)


  let simpleuser: any = {
    nom: this.personneCiblee.nom,
    prenom: this.personneCiblee.prenom,
    status: this.personneCiblee.status,
    song: this.personneCiblee.song,
    commentaire: this.personneCiblee.commentaire,
    enabled: 0,
    prop: this.y,
    username: this.personneCiblee.nom + this.personneCiblee.prenom,
    typeautorisation: this.personneCiblee.type_autorisation,
    tempsautorisation: this.days.join(),
    password: "$2a$08$lDnHPz7eUkSi6ao14Twuau08mzhWrL4kyZGGU5xfiGALO/Vxd5DOi1",
    fcmtoken: "cHbNF1c76yc:APA91bF2j37L86mcvvv2eYmzxGbvFdAKmEn7QM9XOo--cXNfnK28jTz0VioouP-My9hLLLobUB-A14qM2dEejU3PKni4mQGeWghzcBHCKULG8g3O1QKA0RHCKp9WglH8ieGETy4CYBUi",
    email: this.personneCiblee.nom + '.' + this.personneCiblee.prenom + "@SmartAlarm.com",
    lastPasswordResetDate: new Date(),
  }

  if(simpleuser.nom == undefined || simpleuser.prenom == undefined || simpleuser.status == undefined || simpleuser.commentaire == undefined || simpleuser.typeautorisation == undefined ){
    this.errMessage = 'Remplir tous les champs'
  }else{
  this.errMessage = null
    this.userService.create(simpleuser).subscribe(
        data => {
          this.successMessage = this.personneCiblee.nom + ' ' + this.personneCiblee.prenom + ' est bien ajouté'
          console.log('data added successfully: *********' + data)
        },
        error => {
          this.errMessage = 'erreur: ' + error
          console.log('error while adding data: ************' + error)
        });//.subscribe(data => console.log('data'))        JSON.stringify(error.headers)
  }


//    if (this.title == "Ajouter une personne" ) {
//      this.personneService.create(this.personneCiblee).subscribe(
//        () => {
          // redirect to users view
//          this.router.navigate(['home/personne']);

          // publish event so list controller can refresh
//          this.pubSubService.publish('personne-updated');
//        }
//      );
//    } else {
//      this.personneService.update(this.personneCiblee).subscribe(
//        () => {
          // redirect to users view
//          this.router.navigate(['home/personne']);

          // publish event so list controller can refresh
//          this.pubSubService.publish('personne-updated');
//        }
//      );
//    }
}else{ console.log("Update")
  this.days = []
    if(this.x.sunday)
    this.days.push('Dimanche de'+ this.x.startsunday + ' jusqu\'à ' + this.x.endsunday)
  if(this.x.monday)
    this.days.push('Lundi de '+ this.x.startmonday + ' jusqu\'à ' + this.x.endmonday)
  if(this.x.tuesday)
    this.days.push('Mardi de '+ this.x.starttuesday + ' jusqu\'à ' + this.x.endtuesday)
  if(this.x.wednesday)
    this.days.push('Mercredi de '+ this.x.startwednesday + ' jusqu\'à ' + this.x.endwednesday)
  if(this.x.thursday)
    this.days.push('Jeudi de '+ this.x.startthursday + ' jusqu\'à ' + this.x.endthursday)
  if(this.x.friday)
    this.days.push('Vendredi de '+ this.x.startfriday + ' jusqu\'à ' + this.x.endfriday)
  if(this.x.saturday)
    this.days.push('Samedi de '+ this.x.startsaturday + ' jusqu\'à ' + this.x.endsaturday)
    console.log(this.days)


  let simpleuser: any = {
  id: this.x.id,
    nom: this.x.nom,
    prenom: this.x.prenom,
    status: this.x.status,
    song: this.x.song,
    commentaire: this.x.commentaire,
    enabled: this.x.enabled,
    prop: this.x.prop,
    username: this.x.username,
    typeautorisation: this.x.type_autorisation,
    tempsautorisation: this.days.join(),
    password: this.x.password,
    fcmtoken: this.x.fcmtoken,
    email: this.x.email,
    lastPasswordResetDate: this.x.lastPasswordResetDate,
  }

  if(simpleuser.nom == undefined || simpleuser.prenom == undefined || simpleuser.status == undefined || simpleuser.commentaire == undefined || simpleuser.typeautorisation == undefined ){
    this.errMessage = 'Remplir tous les champs'
  }else{
  this.errMessage = null
    this.userService.update(simpleuser).subscribe(
        data => {
          this.successMessage = this.x.nom + ' ' + this.x.prenom + ' est bien modifié'
          console.log('data added successfully: *********' + data)
        },
        error => {
          this.errMessage = 'erreur: ' + error
          console.log('error while adding data: ************' + error)
        });//.subscribe(data => console.log('data'))        JSON.stringify(error.headers)
  }


//    if (this.title == "Ajouter une personne" ) {
//      this.personneService.create(this.personneCiblee).subscribe(
//        () => {
          // redirect to users view
//          this.router.navigate(['home/personne']);

          // publish event so list controller can refresh
//          this.pubSubService.publish('personne-updated');
//        }
//      );
//    } else {
//      this.personneService.update(this.personneCiblee).subscribe(
//        () => {
          // redirect to users view
//          this.router.navigate(['home/personne']);

          // publish event so list controller can refresh
//          this.pubSubService.publish('personne-updated');
//        }
//      );
//    }
}


  }



}
