import { Injectable } from '@angular/core';
import { Subject } from '../models/subjectDTO';
import { SubjectApiService } from './server-petitions/api/subject-api.service';
import { Observable, map } from 'rxjs';
import { LoginInfoService } from './login-info.service';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {
  
  constructor(
    private subjectApi: SubjectApiService,
    private loginInfo: LoginInfoService
  ) { }

  createSubject(subject: Subject): Observable<string | undefined> {
    subject.teacherId = this.loginInfo.userData?.userId
    return this.subjectApi.createSubject(subject).pipe(
      map(res => res.accessCode)
    )
  }
}
