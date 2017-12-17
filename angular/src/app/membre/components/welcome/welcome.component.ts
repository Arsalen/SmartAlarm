import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import {IdService } from '../../services/id.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  constructor(private route : ActivatedRoute,private idService : IdService) { }
  private id:number;

  ngOnInit() {
    this.route.params.subscribe(params =>{
          this.idService.setId(+params['id']);
          this.id = this.idService.getId();
    }   
    )
  }

}


/**
 * 
 * this component gets the id from the route parameters and sets it in the idService
 * wich will be a singleton service declared in app.module.ts as a provider
 * 
 */