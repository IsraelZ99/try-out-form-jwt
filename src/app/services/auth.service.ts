import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { JwtHelperService } from "@auth0/angular-jwt";
import { tap } from "rxjs/operators";
import { Observable, BehaviorSubject } from "rxjs";
import { Router } from "@angular/router";

import { UserI } from "../models/user";
import { JwtResponseI } from "../models/jwt-response";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly jwtHelper = new JwtHelperService();
  authSubject = new BehaviorSubject(false);
  authJWT: JwtResponseI;
  private headers: HttpHeaders = new HttpHeaders({
    "Content-Type": "application/json",
    "Authorization": localStorage.getItem('accessToken')
  })

  constructor(private http: HttpClient, private router: Router) { }

  login(user: UserI): Observable<JwtResponseI> {
    return this.http.post<JwtResponseI>(`${environment.AUTH_SERVICE}/auth/token`, {
      username: user.username,
      password: user.password
    }).pipe(tap(this.setSession.bind(this)));
  }

  setSession(jwtResponse: JwtResponseI) {
    localStorage.setItem('accessToken', jwtResponse.token);
    localStorage.setItem('username', jwtResponse.details.username);
    const roles = jwtResponse.details.authorities.join(',');
    localStorage.setItem('roles', roles);
  }

  logout(): void {
    this.http.get(`${environment.AUTH_SERVICE}/auth/logout/`, { headers: this.headers }).subscribe(res => {
      localStorage.removeItem('accessToken');
      localStorage.clear();
      this.router.navigateByUrl("/auth/login");
    });
  }

}
