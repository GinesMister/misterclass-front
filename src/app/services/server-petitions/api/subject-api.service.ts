import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataConnetion } from '../dataConnection';
import { Observable } from 'rxjs';
import { Subject } from '../../../models/subjectDTO';

@Injectable({
  providedIn: 'root'
})
export class SubjectApiService {

constructor(private http: HttpClient) { }

  private readonly url = `${DataConnetion.baseUrl}/subject`

  getSubjectsCreatedByUserId(userId: string): Observable<Array<Subject>> {
    return this.http.get<Array<Subject>>(`${this.url}/getSubjectsByTeacherId?teacherId=${userId}`) 
  }

  createSubject(subject: Subject): Observable<Subject> {
    return this.http.post<Subject>(`${this.url}/createSubject`, subject)
  }

  getSubjectFullDataById(subjectId: number): Observable<Subject> {
    return this.http.get<Subject>(`${this.url}/getById?id=${subjectId}`) 
  }
}
