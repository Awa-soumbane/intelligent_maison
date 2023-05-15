export class User {
  _id?: string;
  prenom?: string;
  nom?: string;
  email?: string;
  role?: string;
  mot_pass?: string;
  etat?: boolean;

  data?:{
    token?:string;
    userId?: string
    prenom?:string;
    nom?: string;
   role?: string;
   email?: string;
   rfid?: string
}

 
}



