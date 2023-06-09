import { Injectable } from "@angular/core";
import { User } from "../models/user";
import { BehaviorSubject, Observable, throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Router } from "@angular/router";

@Injectable({
    providedIn: 'root',
  })
  export class AuthService {
    [x: string]: any;
    endpoint: string = 'http://localhost:4002/api/';
    headers = new HttpHeaders().set('Content-Type', 'application/json');
    currentUser = {};
    httpClient: any;
    endpointIo: string = 'http://localhost:4002'

    private currentUserSubject: BehaviorSubject<User>;


    constructor(private http: HttpClient, public router: Router) {
      this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')!!));
    }

    public get currentUserValue(): User {
      return this.currentUserSubject.value;
    }
  
    // Recuperer la temperature et l'humidité
    GetDonnees(){
      return this.http.get(`${this.endpointIo}`);
    }
  
     // Recuprer tous les utilisateurs
    GetUsers() {
        return this.http.get(`${this.endpoint}`);
    }
  
    // Recuperer un utilisateur
    GetUser(id: any): Observable<any> {
        let API_URL = `${this.endpoint}/read-user/${id}`;
        return this.http.get(API_URL, { headers: this.headers }).pipe(
        map((res: any) => {
            return res || {};
        }),
        catchError(this.handleError)
        );
    }
  
    // Update user
    updateUser(id: any, data: any): Observable<any> {
        let API_URL = `${this.endpoint}update-user/${id}`;
        return this.http
        .put(API_URL, data, { headers: this.headers })
        .pipe(catchError(this.handleError));
    }
    //Update mdp
    update1User(id: any, data: any): Observable<any> {  
      let API_URL = `${this.endpoint}/updatepass/${id}`;
  
      return this.http.patch(`${this.endpoint}/updatepass/${id}`, 
      {"actuelpassword": data.actuelpassword,
    "newpassword":data.newpassword})
    }

    // Ajouter un utilisateur
    addUser(prenom: string, nom: string, email: string, role: string, mot_pass: string,rfid: string, etat: boolean): Observable<any> {
        const user={
          prenom: prenom,
          nom: nom,
          email:email,
          mot_pass: mot_pass,
          etat:etat,
          role:role,
        rfid:rfid,
        }
      return this.http.post<User>(`${this.endpoint}/add-user`, user, {
        reportProgress: true,
        observe: 'events',
      });
    }
  
    
    // Connexion
    login(user: User) {
      return this.http
        .post<any>(`${this.endpoint}/login`, user)
        
    }
    getToken() {
      return localStorage.getItem('currentUser')?.replace(/"/g,  "");
    }
    get isLoggedIn(): boolean {
      let authToken = localStorage.getItem('token');
      return authToken !== null ? true : false;
    }


      getConnexion(user:User){
        console.log("test user: ", user);
        
    return this.http.post<any>(`${this.endpoint}/login`,user).
      pipe(map(user => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        //Ceci permet de garder l'utilisateur connecté entre les differentes pages
        /* localStorage.setItem('currentUser', JSON.stringify(user.data?.token));
        localStorage.setItem('id', JSON.stringify(user.data?.userId));
        localStorage.setItem('prenom', JSON.stringify(user.data?.prenom));
        localStorage.setItem('nom', JSON.stringify(user.data?.nom));
        localStorage.setItem('role', JSON.stringify(user.data?.role));
        localStorage.setItem('email', JSON.stringify(user.data?.email));
        localStorage.setItem('rfid', JSON.stringify(user.data?.rfid));
        this.currentUserSubject.next(user); */
        
  
        localStorage.setItem('prenom', user.prenom);
        localStorage.setItem('nom', user.nom);
        localStorage.setItem('role', user.role);
        localStorage.setItem('email', user.email);
       
        console.log(user);
        localStorage.setItem('id',user._id);

        
        return user;
      }));

  }
    
    doLogout() {
      localStorage.clear();
        this.router.navigate(['login']);
      }
    

    // User profile
    getUserProfile(id: any): Observable<any> {
      let api = `${this.endpoint}/read-user/${id}`;
      return this.http.get(api, { headers: this.headers }).pipe(
        map((res) => {
          return res || {};
        }),
        catchError(this.handleError)
      );
    }

    
    // Error
    handleError(error: HttpErrorResponse) {
      let msg = '';
      if (error.error instanceof ErrorEvent) {
        // client-side error
        msg = error.error.message;
      } else {
        // server-side error
        msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
      }
      return throwError(msg);
    }
  }
  