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
      this.sortUnits()
    }).add(() => {
      this.sortTasks()
    })
  }

  // Units
  createUpdateUnit(unit: Unit, isNew = true) {
    if (isNew) {
      this.subjectApi.createUnit(this.subjectData?.subjectId!, unit).subscribe(() => { 
        this.updateSubjectData()
      })
    } else this.subjectApi.updateUnit(unit.unitId!, unit).subscribe(() => {
      this.updateSubjectData
    })
    console.log(unit)
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

  // Delivery
  createDelivery(task: Task, file: File) {
    this.subjectApi.createDelivery(task.taskId!, this.loginInfo.userData?.userId!,file).subscribe(res => {
      
    })
  }

  // Sort elements
  private sortUnits() {
    this.subjectData?.units!.sort((a, b) => a.title!.localeCompare(b.title!))
  }
  private sortTasks() {
    for (const unit of this.subjectData?.units!) {
      unit.tasks?.sort((a, b) => a.deadline!.localeCompare(b.deadline!))
    }
  }
}
