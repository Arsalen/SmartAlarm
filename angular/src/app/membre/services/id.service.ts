import { Injectable } from '@angular/core';

@Injectable()
export class IdService {

  private userId:number;
  constructor() { }

  getId(){
    return this.userId;
  }
  setId(id:number){
    this.userId = id;
  }

}
