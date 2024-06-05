import { Injectable } from '@angular/core';
import { Subject } from '../models/subjectDTO';
import { SubjectApiService } from './server-petitions/api/subject-api.service';
import { Observable, map } from 'rxjs';
import { LoginInfoService } from './login-info.service';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {
  
  subjectData: Subject | undefined

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

  subscribeStudentToSubject(subjectCode: string): Observable<boolean> {
    const userId = this.loginInfo.userData?.userId
    return this.subjectApi.subscribeStudentToSubject(userId!, subjectCode)
  }

  updateSubjectData(subjectId?: number) {
    if (subjectId == undefined) subjectId = this.subjectData?.subjectId
    this.subjectApi.getFullSubjectDataById(subjectId!).subscribe(res => {
      this.subjectData = res
    })
  }
}
