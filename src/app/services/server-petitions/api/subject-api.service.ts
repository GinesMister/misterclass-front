import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataConnetion } from '../dataConnection';
import { Observable } from 'rxjs';
import { Subject, Task, Unit } from '../../../models/subjectDTO';

@Injectable({
  providedIn: 'root'
})
export class SubjectApiService {

constructor(private http: HttpClient) { }

  private readonly url = `${DataConnetion.baseUrl}/subject`

  getSubjectsCreatedByUserId(userId: string): Observable<Array<Subject>> {
    return this.http.get<Array<Subject>>(`${this.url}/getSubjectsByTeacherId?teacherId=${userId}`) 
  }
  
  getFullSubjectDataById(subjectId: number): Observable<Subject> {
    return this.http.get<Subject>(`${this.url}/getById?id=${subjectId}`) 
  }

  createSubject(subject: Subject): Observable<Subject> {
    return this.http.post<Subject>(`${this.url}/createSubject`, subject)
  }

  subscribeStudentToSubject(userId: string, subjectCode: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.url}/subscribeStudentToSubject?userId=${userId}&subjectCode=${subjectCode}`)
  }

  // Unit
  createUnit(subjectId: number, unit: Unit): Observable<void> {
    return this.http.put<void>(`${this.url}/unit/create?subjectId=${subjectId}`, unit)
  }
  
  updateUnit(unitId: number, unit: Unit): Observable<void> {
    return this.http.put<void>(`${this.url}/unit/update?unitId=${unitId}`, unit)
  }
  
  // Task
  createTask(unitId: number, task: Task): Observable<void> {
    return this.http.put<void>(`${this.url}/task/create?unitId=${unitId}`, task)
  }
  
  updateTask(taskId: number, task: Task): Observable<void> {
    return this.http.put<void>(`${this.url}/task/update?taskId=${taskId}`, task)
  }
}
