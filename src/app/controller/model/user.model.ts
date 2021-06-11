import {DemandeAbsence} from './demande-absence.model';
import {Document} from './document.model';
import {Equipe} from './equipe.model';
import {FileDB} from './file-db.model';

export class User {

    public  id:number;
    public  username :string;
    public  email : string;
    public  password: string;
    public  password2: string;
    public  fullname:string;
    public roles:Array<string> ;
    public  matricule:string;
    public  date_naissance:string;
    public  anciennete:string;
    public  dateEmbauche:string;
    public  responsable:string;
    public  emmploi:string;
    public  uniteOrgani:string;
    public  indice:number;
    public  echelle:string;
    public  echelon:string;
    public  datechelle:string;
    public  datechelon:string;
    public  phoneNumber:string;
    public demandeAbsences= new Array<DemandeAbsence>();
    public documents= new Array<Document>();
    public equipe=new Equipe();
    public filedb= new Array<FileDB>();
}
