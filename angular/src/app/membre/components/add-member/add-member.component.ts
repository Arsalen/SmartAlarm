import { Component, OnInit } from '@angular/core';
import {AdminService} from '../../services/admin.service';
import {Profile} from '../../entities/profile';
import {PersonneAutoriseeService} from "../../../_services/personne_autorisee.service";
import {PersonneAutorisee} from "../../../_models/personneAutorisee";

@Component({
  selector: 'app-add-member',
  templateUrl: './add-member.component.html',
  styleUrls: ['./add-member.component.css'],
  providers:[AdminService]
})
export class AddMemberComponent implements OnInit {

  private personne_autorisee : PersonneAutorisee[];
  private profiles : Profile[]; //liste des prifiles qui veulent devienir des membres
  constructor(
    private personne_service : PersonneAutoriseeService,
    private adminService : AdminService
  ) { }

  ngOnInit() {
   // this.adminService.getProfiles().then(profiles => this.profiles = profiles);
      this.personne_service.getAll().subscribe(
        people => {
          console.log(people);
          this.personne_autorisee = people;
        }
      );
  }

}
