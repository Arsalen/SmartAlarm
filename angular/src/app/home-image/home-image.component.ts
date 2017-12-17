import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-home-image',
  templateUrl: './home-image.component.html',
  styleUrls: ['./home-image.component.css']
})
export class HomeImageComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  espace_perso(){
    this.router.navigate(['/inscription']);
  }
}
