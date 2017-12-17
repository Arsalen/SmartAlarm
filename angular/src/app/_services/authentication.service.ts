import {Injectable} from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import {current} from "codelyzer/util/syntaxKind";
import {Router} from "@angular/router";

@Injectable()
export class AuthenticationService {
  private authUrl = 'http://localhost:8080/auth';
  private headers = new Headers({'Content-Type':'application/json'});

    constructor(
      private router : Router,
      private http: Http) { }

    login(username: string, password: string) {
        return this.http.post(this.authUrl, JSON.stringify({ username: username, password: password }), {headers:this.headers})
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let token = response.json() && response.json().token ;
                if (token) {
                  // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify({ username: username, token: token }));

                }
             // console.log("saluuuut 2");
                return token;
            });
    }
    getToken(): String {
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        var token = currentUser && currentUser.token;
      return token ? token :'';
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
      this.router.navigate(['/connexion']);

    }
}
