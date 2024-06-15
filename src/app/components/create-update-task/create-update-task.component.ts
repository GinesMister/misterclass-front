import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Task, Unit } from '../../models/subjectDTO';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SubjectService } from '../../services/subject.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-create-update-task',
  templateUrl: './create-update-task.component.html',
  styleUrls: ['./create-update-task.component.scss']
})
export class CreateUpdateTask implements OnInit {

  @Output() onAction: EventEmitter<void | Observable<void>> = new EventEmitter<void | Observable<void>>()
  @Input() task!: Task
  @Input() unit!: Unit

  taskForm!: FormGroup
  taskFile!: File
  dateToManage!: String

  constructor(
    private subjectService: SubjectService,
    private fb: FormBuilder
  ) { }
  
  ngOnInit() {
    this.taskForm = this.fb.group({
      title: [this.task ? this.task.title : '', Validators.required],
      description: [this.task ? this.task.description : '', Validators.required],
      deadline: [this.task ? this.task.deadline : '', Validators.required]
    });
    if (this.task) {
      this.dateToManage = new Date(this.task.deadline!).toISOString().slice(0, 16)
      this.taskForm.patchValue({ deadline: this.dateToManage})
    }

  }

  onUpload($event: any) {
    this.taskFile = $event.target.files[0]
  }

  createUpdateTask() {
    if (!this.taskForm.valid && !this.taskFile) return

    if (this.task) {
      this.task.title = this.taskForm.value.title
      this.task.description = this.taskForm.value.description
      this.task.deadline = new Date(this.taskForm.value.deadline).toISOString()
      this.onAction.emit(this.subjectService.createUpdateTask(this.unit, this.task, undefined, false))
    } else {
      const newTask = new Task()
      newTask.description = this.taskForm.value.description
      newTask.title = this.taskForm.value.title
      newTask.deadline = new Date(this.taskForm.value.deadline).toISOString()
      this.onAction.emit(this.subjectService.createUpdateTask(this.unit, newTask, this.taskFile, true))
    }
    
  }
  
  cancel() {
    this.onAction.emit()
  }

}
