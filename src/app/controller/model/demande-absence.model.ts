import {Employe} from './employe.model';
import {User} from './user.model';

export class DemandeAbsence {


    public   id: number;

    // @ts-ignore

    public  ref: string;
    // @ts-ignore
    public  type: string;
    // @ts-ignore
    public nombrejours: number;
    // @ts-ignore
    public firstDay: string;
    // @ts-ignore
    public lastDay: string;
    // @ts-ignore
    public interim:string;
    // @ts-ignore
    public status:string;
    // @ts-ignore
    public typeConge:string;
    // @ts-ignore
    public motif:string;
    // @ts-ignore
    public reprise:string;

    public user = new User();



}

