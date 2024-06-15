import { Injectable } from '@angular/core';
import { Delivery, Subject, Task, TheoryElement, Unit } from '../models/subjectDTO';
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

  updateSubjectData(subjectId?: number, onUpdateAction: () => void = () => {}) {
    if (subjectId == undefined) subjectId = this.subjectData?.subjectId
    this.subjectApi.getFullSubjectDataById(subjectId!).subscribe(res => {
      this.subjectData = res
      this.sortUnits()
    }).add(() => {
      if (this.loginInfo.role == 'student')
        this.updateIsDeliveredForTasks()
      this.sortTasks()
      onUpdateAction()
    })
  }

  // Units
  createUpdateUnit(unit: Unit, isNew = true) {
    if (isNew) {
      this.subjectApi.createUnit(this.subjectData?.subjectId!, unit).subscribe(() => { 
        this.updateSubjectData()
        this.sortUnits()
      })
    } else this.subjectApi.updateUnit(unit.unitId!, unit).subscribe(() => {
      this.updateSubjectData()
      this.sortUnits()
    })
  }

  // TheoryElement
  createTheoryElement(unit: Unit, theoryElement: TheoryElement, file: File): Observable<void> {
    return this.subjectApi.createTheoryElement(unit.unitId!, theoryElement, file)
  }

  // Tasks
  createUpdateTask(unit: Unit, task: Task, file?: File, isNew = true): Observable<void> {
    if (isNew) {
      return this.subjectApi.createTask(unit.unitId!, task, file!)
    } else return this.subjectApi.updateTask(unit.unitId!, task)
  }

  // Delivery
  createDelivery(task: Task, file: File): Observable<void> {
    return this.subjectApi.createDelivery(task.taskId!, this.loginInfo.userData?.userId!,file)
  }

  markDelivery(delivery: Delivery, mark: number): Observable<void> {
    return this.subjectApi.markDelivery(delivery.deliveryId!, mark)
  }

  updateIsDeliveredForTasks() {
    for (const unit of this.subjectData?.units!) {
      for (const task of unit.tasks!) {
        if (task.deliveries?.find(delivery => delivery.delivererId === this.loginInfo.userData?.userId) != undefined) {
          task.isDelivered = true
        }
      }
    }
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
