import { Injectable } from '@angular/core';
import { Subject, Task, Unit } from '../models/subjectDTO';
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
    }).add(() => {
      this.sortUnits()
      this.sortTasks()
    })
  }

  // Units
  createUpdateUnit(unit: Unit, isNew = true) {
    if (isNew) {
      this.subjectData?.units?.push(unit)
      this.subjectApi.createUnit(this.subjectData?.subjectId!, unit).subscribe(() => { })
    } else this.subjectApi.updateUnit(unit.unitId!, unit).subscribe(() => { })
    this.sortUnits()
  }

  // Tasks
  createUpdateTask(unit: Unit, task: Task, isNew = true) {
    if (isNew) {
      unit.tasks!.push(task)
      this.subjectApi.createTask(unit.unitId!, task).subscribe(() => { })
    } else this.subjectApi.updateTask(unit.unitId!, task).subscribe(() => { })
    this.sortTasks()
  }

  // Sort
  private sortUnits() {
    this.subjectData?.units!.sort((a, b) => a.title!.localeCompare(b.title!))
  }

  private sortTasks() {
    console.log('hola')
    for (const unit of this.subjectData?.units!) {
      console.log(unit.tasks![0].deadline)
    }
  }
}
