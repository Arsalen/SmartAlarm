
class Activite {
  annee:string;
  titre:string;
}

/*

  manque ces attribues:
  ---------------------
	+articles  (liste de ces publications)
	+projets_participes
	+projets_supervises
	+cv         (*)
	+privileges (*)
*/

export class Profile {
  titre :string;
  nom_prenom :string;
  adresse:string;
  id_membre:number;
  date_naissance:string;
  status:string;
  image_profile:string;
  email :string;
  numero_tel :string[];
  passwd:string;
  alias:string;
  num_cin:string;
  position_actuelle:string;
  activite_enseignement:Activite[];
  activite_recherche:Activite[];
  diplomes_formations:Activite[];
}
