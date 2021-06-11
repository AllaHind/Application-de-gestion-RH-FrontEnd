import {User} from './user.model';

export class Document {
    public  id: number
    public  libelle: string;
    public   dateDemande: string;
    public   status: string;
    public user = new User();
}
