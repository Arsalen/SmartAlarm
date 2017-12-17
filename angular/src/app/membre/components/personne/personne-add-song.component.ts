import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {PubSubService} from "../../../_services/pubSubService.service";
import {PersonneAutoriseeService} from "../../../_services/personne_autorisee.service";
import {slideInOutAnimation} from "../../../_animations/slide-in-out.animation";
import {User} from "../../../_models/user";
import {UserService} from "../../../_services/user.service";
import {PersonneAutorisee} from "../../../_models/personneAutorisee";
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

import {AlertService} from "../../../_services/alert.service";

@Component({
  templateUrl: 'personne-add-song.component.html',
})


export class PersonneAddSongComponent implements OnInit {

  title = "Ajouter une mélodie";
  choixBouton = "Enregistrer";
  private melodieCiblee : any = {};
  currentUserCookies : any;
  currentUserBody : any;
  private errMessage : string;
  private successMessage : string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private personneService: PersonneAutoriseeService,
    private pubSubService: PubSubService,
    private userService: UserService,
    private alertService: AlertService) {

    this.currentUserCookies = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit() {
//    let personneId = Number(this.route.snapshot.params['id']);
//    if (personneId) {
//      this.title = 'Modifier les informations';
//      this.choixBouton = 'Enregistrer les modifications';
//      this.personneService.getById(personneId).subscribe(
//        person => {
//          this.personneCiblee = person;
//          },
//        error =>{
//          console.log("errrrrrrror");
//          console.log(error);

//        }
//      );

//    }
  }

  saveMelodie() {

  let simplemelodie: any = {
    name: this.melodieCiblee.name,
  }

  this.userService.createSong(simplemelodie).subscribe(
        data => {
        this.successMessage = 'data added successfully'
          console.log('data added successfully')
        },
        error => {
        this.successMessage = 'data added successfully'
        //this.errMessage = 'error while adding data '
          console.log('error while adding data ')
        });

  }

}
