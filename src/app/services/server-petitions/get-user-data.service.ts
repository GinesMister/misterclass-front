import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataConnetion } from './dataConnection';
import { Observable } from 'rxjs';
import { UserData } from '../../models/userDataDTO';

@Injectable({
  providedIn: 'root'
})
export class GetUserDataService {

  constructor(private http: HttpClient) { }

  private readonly url = DataConnetion.baseUrl 

  getUserById(userId: string): Observable<UserData> {
    return this.http.get<UserData>(`${this.url}/user/getById?userId=${userId}`);
  }
}
