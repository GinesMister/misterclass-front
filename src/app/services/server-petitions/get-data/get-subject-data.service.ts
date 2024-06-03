import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataConnetion } from '../dataConnection';
import { Observable } from 'rxjs';
import { Subject } from '../../../models/subjectDTO';

@Injectable({
  providedIn: 'root'
})
export class GetSubjectDataService {

constructor(private http: HttpClient) { }

  private readonly url = DataConnetion.baseUrl 

  getSubjectsCreatedByUserId(userId: string): Observable<Array<Subject>> {
    return this.http.get<Array<Subject>>(`${this.url}/subject/getSubjectsByTeacherId?teacherId=${userId}`) 
  }
}
