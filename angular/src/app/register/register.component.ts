import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AlertService, UserService } from '../_services/index';

@Component({

    templateUrl: 'register.component.html'
})

export class RegisterComponent {
    model: any = {};
   /*   ----------Modele pour tester-------------

    model2: any = {
    username: "slim99",
    password: "slim99",
    prenom: "slim99",
    email: "crisstal@gmail.com",
    enabled: "true",
    lastPasswordResetDate: new Date()
    };
    */

    loading = false;

    constructor(
        private router: Router,
        private userService: UserService,
        private alertService: AlertService) { }

    register() {
        this.loading = true;
        this.model.enabled = 0;
        this.model.lastPasswordResetDate = new Date();
        console.log(this.model);
        this.userService.create(this.model)
            .subscribe(
                data => {
                    this.alertService.success('Compte créé avec Succès', true);
                    this.router.navigate(['/login']);
                },
                error => {
                    this.alertService.error('Cette adresse mail est déja utilisée !');
                    this.loading = false;
                });
    }
}
