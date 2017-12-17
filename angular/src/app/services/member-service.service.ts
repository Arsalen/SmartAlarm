import { Injectable } from '@angular/core';
import { Member } from '../entities/member';

import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';

@Injectable()
export class MemberServiceService {

    // spring url:    http://192.168.1.3:8080/membres

    private membersUrl = "http://localhost:3000/api/membres";

    constructor(private http : Http) { }

    getMembers(): Observable<Member[]> {
        return this.http.get(this.membersUrl)
        .map(res => res.json());
    }

    getMember(id:number){
      const url = `${this.membersUrl}/${id}`;
      return this.http.get(url)
      .map(res => res.json());
    }


    
}