import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { User } from '../_models/index';

@Injectable()
export class UserService {

    userUrl = 'http://localhost:8080/users';
    registerUrl = '/register';
  constructor(private http: Http) { }


    getAll() {
        return this.http.get(this.userUrl, this.jwt()).map((response: Response) => response.json());
    }

    //getByEmailAndToken(String: email, String: token){
  //
  // }

  getHistorique() {
        return this.http.get(this.userUrl + 'a' , this.jwt()).map((response: Response) => response.json());
    }

  getHistoriqueServer() {
        return this.http.get(this.userUrl + 'h' , this.jwt()).map((response: Response) => response.json());
    }

    getLockstate() {
        return this.http.get(this.userUrl + 'p' , this.jwt()).map((response: Response) => response.json());
    }

    getById(id: number) {
    console.log(this.userUrl + '/' + id)
    return this.http.get(this.userUrl + '/' + id, this.jwt()).map((response: Response) => response.json());
  }

  getByUsername(username: string) {
    console.log(username+'service');
    return this.http.get(this.userUrl + 's/' + username, this.jwt()).map((response: Response) => response.json());
  }

  getByProp(user: any) {
    console.log('service: '+user)
    return this.http.post(this.userUrl + 'w', user, this.jwt()).map((response: Response) => response.json());
  }

    create(user: User) {
        console.log("create user");
 //       console.log(JSON.stringify(user));
        return this.http.post(this.userUrl+this.registerUrl, user, this.jwt()).map((response: Response) => console.log('response**************: '), (error: Error) => {console.log('error: **************')} );
    }

    createSong(song: any) {
        console.log("create song");
 //       console.log(JSON.stringify(user));
        return this.http.post(this.userUrl + 'i', song, this.jwt()).map((response: Response) => console.log('response: '+response.json()), error => {console.log('error service: '+error)} );
    }

    getSong() {
        return this.http.get(this.userUrl + 'i', this.jwt()).map((response: Response) => response.json());
    }

    deleteSong(id: number) {
        return this.http.delete(this.userUrl +'i/'+ id, this.jwt()).map((response: Response) => {console.log('done with deleting')});
    }

    update(user: User) {
        return this.http.put(this.userUrl +'/'+ user.id, user, this.jwt()).map((response: Response) => response.json());
    }

    delete(id: number) {
        return this.http.delete(this.userUrl +'/'+ id, this.jwt()).map((response: Response) => {console.log('done with deleting')});
    }

    deleteToken(id: number) {
        return this.http.delete(this.userUrl +'e/'+ id, this.jwt()).map((response: Response) => {console.log('done with deleting')});
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
            'Content-Type':'application/json', 'Authorization': 'Bearer '});
          return new RequestOptions({ headers : headers });
        }
    }
}
