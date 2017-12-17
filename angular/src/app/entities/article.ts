/*
    reste a cree les attribues:
    ---------------------------
	+commentaires
	+nombre_aimes
	+fichies_attaches(*)
	+parametres_partage(free/paye)
*/


export class Article {
    id:number;
    titre:string;
    membre:SmallMember;
    date:string;
    temps:string;
    contenue:string;
    nombre_aimes:number;
    nombre_commentaires:number;
}
class SmallMember{
    id:number;
    nom_prenom:string;
}