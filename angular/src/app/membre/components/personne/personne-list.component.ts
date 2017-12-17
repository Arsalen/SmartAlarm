import {Component, OnDestroy, OnInit} from '@angular/core';
import {Notif} from '../../entities/notif';
import {NotifService} from '../../services/notif.service';
import {ActivatedRoute, Router} from '@angular/router';
import {PersonneAutoriseeService} from "../../../_services/personne_autorisee.service";
import {PersonneAutorisee} from "../../../_models/personneAutorisee";
import {Subscription} from "rxjs/Subscription";
import {PubSubService} from "../../../_services/pubSubService.service";
import {UserService} from "../../../_services/user.service";
import {User} from "../../../_models/user";
import {error} from "selenium-webdriver";


@Component({
  selector: 'app-personne',
  templateUrl: './personne-list.component.html',
  styleUrls: ['./personne-list.component.css'],
  providers:[NotifService]
})
export class PersonneListComponent implements OnInit/*, OnDestroy */{


  private personne_autorisee : any[] = [] ;
  private melodie_autorisee : any[];
  private subscription: Subscription;
  personne: any = {};
  currentUserCookies : any;
  currentUserBody : any;
  historiques: any[];
  historiques_serveur: any[];
  lockstates: any[];

  private errMessage : string;
  private successMessage : string;
  deleted: any;
  y: any
  constructor(
    private route: ActivatedRoute,
    private personne_service : PersonneAutoriseeService,
    private notifService : NotifService,
    private router : Router,
    private pubSubService: PubSubService,
    private userService: UserService
  )
  {
    this.currentUserCookies = JSON.parse(localStorage.getItem('currentUser'));
    this.successMessage = null
     this.errMessage = null
  }

   routeMe(){
     this.router.navigate(['addmember']);
     console.log('route me');
   }

  ngOnInit() {

//  this.userService.getByUsername(this.currentUserCookies.username).subscribe(
//      data =>{ 
//        this.y = data
//        console.log('sssssssssssssssssssssssss'+ this.y)
//      },
//      error =>{
//        console.log("erreur");
//      }
//    );

this.successMessage = null
     this.errMessage = null

  this.userService.getByUsername(this.currentUserCookies.username).subscribe(
        person => {console.log('fffffffffffffffffffff' + this.currentUserCookies.username)
          this.y = person
        },
        error =>{
          console.log("errrrrrrror");
        }
      );

//     this.loadPersonnes();
    // reload persons when updated
    this.subscription = this.pubSubService.on('personne-updated').subscribe(() => this.loadPersonnes());

    this.userService.getHistorique().subscribe(data => this.historiques = data)

    this.userService.getHistoriqueServer().subscribe(data => this.historiques_serveur = data)

    this.userService.getLockstate().subscribe(data => this.lockstates = data)
    //this.notifService.getNotifications().subscribe(notifs => this.notifications = notifs);
  }
  /*
  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
//    this.subscription.unsubscribe();
console.log('listComponent')
    }*/
  private loadPersonnes() {
    this.successMessage = null
     this.errMessage = null
    this.loadCurrentUserInformation(this.currentUserCookies.username);

    this.userService.getByProp(JSON.stringify(this.y)).subscribe(
        data => {
          console.log(data)
          this.personne_autorisee = data
        },
        error =>{
          console.log("errrrrrrror");
        }
      );

//    this.userService.getAll().subscribe(data => {
//        console.log('data loaded successfully');
//        this.personne_autorisee = data["_embedded"]["users"]
//    })

    this.userService.getSong().subscribe(data => {
        this.melodie_autorisee = data
    })





    //

    /*this.personne_service.getAll().subscribe(
      people => {
        console.log(people);
        this.personne_autorisee = people;
      }
    );*/
  }

  delete(personne:any){
     //console.log("delete goo for id :"+id);
     this.successMessage = null
     this.errMessage = null
     this.userService.deleteToken(personne.id).subscribe(
       //message => {
         //console.log(message);
       //},
       error => {
         console.log(error);
       }
     );

     this.userService.delete(personne.id).subscribe(
       message => {
          this.deleted = true
          this.errMessage = null
          this.successMessage = personne.nom +' bien supprimé'
         console.log('deleted successfully');
       },
       error => {
          this.deleted = false
          this.successMessage = null
          this.errMessage = 'erreur lors de suppression de l\'utilisateur'
         console.log('error while deleting');
       }
     );
    }

    deleteMelodie(id:number){
     this.userService.deleteSong(id).subscribe(
       message => {
         console.log('deleted successfully');
       },
       error => {
         console.log('error while deleting');
       }
     );


//     this.userService.delete(id).subscribe(
//       message => {
         // redirect to users view
//         console.log(message);
//         this.router.navigate(['home/personne']);

         // publish event so list controller can refresh
//         this.pubSubService.publish('personne-updated');

//       },
//       error => {
//         console.log("holla ERRRROR");
//       }
//     );
  }



  loadCurrentUserInformation(username) {
    console.log(username);
    this.successMessage = null
     this.errMessage = null

    this.userService.getByUsername(username).subscribe(
      data =>{
        console.log("salut");
        this.currentUserBody = data;
        console.log("salut");
        console.log(this.currentUserBody);
        this.personne_autorisee = this.currentUserBody.personnes;
        console.log(this.personne_autorisee);
      },
      error =>{
        console.log("erreur");
      }
    );


  }

//nom
//prenom
//status
//song
//enabled = 0

}
