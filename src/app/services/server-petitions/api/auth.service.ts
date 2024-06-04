import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthRequest } from '../../../models/authRequestDTO';
import { Observable } from 'rxjs';
import { DataConnetion } from '../dataConnection';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  private readonly url = DataConnetion.baseUrl + '/user/registerLogin'

  logInRegister(authRequest: AuthRequest): Observable<boolean> {
    return this.http.post<boolean>(this.url, authRequest);
  }
}
