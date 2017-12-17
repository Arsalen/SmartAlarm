import { Injectable } from '@angular/core';
import {Profile} from '../entities/profile';



import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';



const PROFILES: Profile[] = [
  {
      titre :"simple string",
      id_membre:7459,
      image_profile:"url for profile picture",
      status:"marie",
      adresse:"mahdia",
      nom_prenom :"simple string",  
      date_naissance:"simple string",
      email :"simple string",
      numero_tel :['20160609','23253036'],
      passwd:"simple string",
      alias:"simple string",
      num_cin:"23253063",
      position_actuelle:"simple string",
      activite_enseignement:[{titre:"sss",annee:"sdjfks"}],
      activite_recherche:[{titre:"sss",annee:"sdjfks"}],
      diplomes_formations:[{titre:"sss",annee:"sdjfks"},{titre:"sss",annee:"sdjfks"},{titre:"sss",annee:"sdjfks"}]
  },
  {
      titre :"simple string",
      image_profile:"url for profile picture",
      status:"marie",
      adresse:"mahdia",
      nom_prenom :"simple string",
      id_membre:75,
      date_naissance:"simple string",
      email :"simple string",
      numero_tel :['20160609','23253036'],
      passwd:"simple string",
      alias:"simple string",
      num_cin:"23253063",
      position_actuelle:"simple string",
      activite_enseignement:[{titre:"sss",annee:"sdjfks"}],
      activite_recherche:[{titre:"sss",annee:"sdjfks"}],
      diplomes_formations:[{titre:"sss",annee:"sdjfks"},{titre:"sss",annee:"sdjfks"},{titre:"sss",annee:"sdjfks"}]
  },
  {
      titre :"simple string",
      id_membre:745,
      image_profile:"url for profile picture",
      status:"marie",
      adresse:"mahdia",
      nom_prenom :"simple string",
      date_naissance:"simple string",
      email :"simple string",
      numero_tel :['20160609','23253036'],
      passwd:"simple string",
      alias:"simple string",
      num_cin:"23253063",
      position_actuelle:"simple string",
      activite_enseignement:[{titre:"sss",annee:"sdjfks"}],
      activite_recherche:[{titre:"sss",annee:"sdjfks"}],
      diplomes_formations:[{titre:"sss",annee:"sdjfks"},{titre:"sss",annee:"sdjfks"},{titre:"sss",annee:"sdjfks"}]
  }
];


@Injectable()
export class ProfileService {

  private profileUrl = 'http://localhost:3000/api/membres';

  constructor(private http:Http){

  }

  getProfile(id:number){
    let url = `${this.profileUrl}/${id}`;
    return this.http.get(url).map(res=> res.json() );
  }

  getProfiles():Promise<Profile[]>{
    return Promise.resolve(PROFILES);
  }


}
