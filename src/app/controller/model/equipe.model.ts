import {Document} from './document.model';
import {User} from './user.model';

export class Equipe {

    public id:number;
    public  name:string;
  public users= new Array<User>();
}
