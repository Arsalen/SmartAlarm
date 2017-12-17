import {Injectable} from "@angular/core";
import { Http, Headers, URLSearchParams,RequestOptions, Response } from '@angular/http';
import {PersonneAutorisee} from "../_models/personneAutorisee";
import {User} from "../_models/user";




@Injectable()
export class PersonneAutoriseeService {

  constructor(private http: Http) { }


  personneUrl = 'http://localhost:8080/personne_autorisee';


  getAll() {
    return this.http.get(this.personneUrl, this.jwt()).map((response: Response) => response.json());
  }


  getById(id: number) {
    return this.http.get(this.personneUrl + '/' + id, this.jwt()).map((response: Response) => response.json());
  }
  create( personne : PersonneAutorisee) {

    return this.http.post(this.personneUrl , personne, this.jwt()).map((response: Response) => response.json());
  }

  update(personne: PersonneAutorisee) {
    return this.http.put(this.personneUrl +'/'+ personne.id, personne, this.jwt()).map((response: Response) => response.json());
  }


  delete(id: number) {
    console.log(id);
    return this.http.delete(this.personneUrl+'/'+ id, this.jwt());//.map((response: Response) => response.json());
  }


  // private helper methods

  private jwt() {
    // create authorization header with jwt token
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser && currentUser.token) {
      const headers = new Headers({ 'Authorization': 'Bearer ' + currentUser.token ,
        'Content-Type':'application/json'});
      return new RequestOptions({ headers: headers });
    }
    else {

      const headers = new Headers({
        'Content-Type':'application/json'});
      return new RequestOptions({ headers : headers });
    }
  }
}
