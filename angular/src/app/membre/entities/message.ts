export class Message {

    contenue:string;
    dir:string /** indicates wether its outgoing message or incoming message */


    constructor(msg:string,direction:string){
        this.contenue = msg;
        this.dir = direction;
    }

}


