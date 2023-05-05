export class User {
  _id?: String;
  prenom?: String;
  nom?: String;
  email?: String;
  role?: String;
  mot_pass?: String;
  etat?: boolean;

  data?:{
    token?:String;
    userId?: String
}
 
}



