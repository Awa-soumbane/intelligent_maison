export class User {
<<<<<<< HEAD
  _id!: String;
  prenom!: String;
  nom!: String;
  email!: String;
  role!: String;
  mot_pass!: String;
  etat!: boolean;
  static data: any;
=======
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
    prenom?:String;
    nom?: String
}
  msg: any;
>>>>>>> origin/Dev
 
}



