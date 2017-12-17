import {PersonneAutorisee} from "./personneAutorisee";
export class User {
    id: number;
    username: string;
    password: string;
    nom: string;
    prenom: string;
    email: string;
    enabled: number;
    lastPasswordResetDate: Date; //new Date("February 4, 2016 10:13:00")
    personnes : PersonneAutorisee[];
    status: string;
    song: number;
    fcmtoken: string;
}

//{"nom":"Xiyao","status":"Owner","username":"Xiyao","password":"$2a$08$lDnHPz7eUkSi6ao14Twuau08mzhWrL4kyZGGU5xfiGALO/Vxd5DOi1","song":1,"fcmtoken":"cHbNF1c76yc:APA91bF2j37L86mcvvv2eYmzxGbvFdAKmEn7QM9XOo--cXNfnK28jTz0VioouP-My9hLLLobUB-A14qM2dEejU3PKni4mQGeWghzcBHCKULG8g3O1QKA0RHCKp9WglH8ieGETy4CYBUi","prenom":"Chan","email":"arsalen.hagui.ensi@gmail.com","enabled":1,"lastPasswordResetDate": "2017-08-24T23:00:42"}
