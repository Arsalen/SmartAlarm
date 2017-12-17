import { Component, OnInit } from '@angular/core';
import {Router}  from '@angular/router';

@Component({
  selector: 'app-projet',
  templateUrl: './projet.component.html',
  styleUrls: ['./projet.component.css']
})
export class ProjetComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }

  goToEdit(){
    this.router.navigate(['/edit']);
  }

}
