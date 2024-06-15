import { Component, Input, OnInit } from '@angular/core';
import { Delivery, Task } from '../../models/subjectDTO';
import { ActivatedRoute } from '@angular/router';
import { SubjectService } from '../../services/subject.service';
import { DataConnetion } from '../../services/server-petitions/dataConnection';
import { LoginInfoService } from '../../services/login-info.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.scss']
})
export class TaskDetailsComponent implements OnInit {

  @Input() task!: Task
  unitId!: number
  downloadLink!: string
  deliveryDownloadBaseLink!: string

  delivery?: Delivery // If student role or for mark

  isCreateDeliveryVisible = false
  isMarkDeliveryVisible = false

  constructor(
    private route: ActivatedRoute,
    public subjectService: SubjectService,
    public loginInfo: LoginInfoService
  ) { }

  ngOnInit() {
    if (!this.task) {
      this.route.params.subscribe(params => {
        this.task = new Task(params['taskId'])
        this.unitId = params['unitId']
        this.updateTaskFromSubjectData()
      })
    }
  }

  updateTaskFromSubjectData() {
    const unitToSearch = this.subjectService.subjectData?.units?.find(
      unit => unit.unitId == this.unitId
    )!
    this.task = unitToSearch.tasks!.find(
      task => task.taskId == this.task.taskId
    )!
    this.downloadLink = 
      `${DataConnetion.downloadTaskUrl}/${this.task.taskId}/${this.task.filename}`
    this.deliveryDownloadBaseLink =
      `${DataConnetion.downloadDeliveryUrl}/`

    if (this.loginInfo.role == 'student' && this.task.isDelivered) {
      this.getDeliveryForStudent()
    }
  }

  updateData($previusAction: Observable<any>) {
    $previusAction.subscribe(() => {
      this.subjectService.updateSubjectData(undefined, () => {
        this.updateTaskFromSubjectData()
      })
    })
  }

  getDeliveryForStudent() {
    this.delivery = this.task.deliveries?.find(
      delivery => delivery.delivererId === this.loginInfo.userData?.userId
    )
  }

  switchCreateDeliveryVisible = () => this.isCreateDeliveryVisible = !this.isCreateDeliveryVisible
  switchMarkDeliveryVisible = () => this.isMarkDeliveryVisible = !this.isMarkDeliveryVisible

  markDelivery(delivery: Delivery) {
    this.delivery = delivery
    this.switchMarkDeliveryVisible()
  }
}
