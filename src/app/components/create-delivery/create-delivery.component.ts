import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Task, TheoryElement, Unit } from '../../models/subjectDTO';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SubjectService } from '../../services/subject.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-create-delivery',
  templateUrl: './create-delivery.component.html',
  styleUrls: ['./create-delivery.component.scss']
})
export class CreateDeliveryComponent implements OnInit {

  @Output() onAction: EventEmitter<void | Observable<void>> = new EventEmitter<void | Observable<void>>()
  @Input() task!: Task

  deliveryFile!: File

  constructor(
    private subjectService: SubjectService,
  ) { }
  
  ngOnInit() {
  }

  onUpload($event: any) {
    this.deliveryFile = $event.target.files[0]
  }

  createDelivery() {
    if (!this.deliveryFile) return
    this.onAction.emit(this.subjectService.createDelivery(this.task, this.deliveryFile))
  }
  
  cancel() {
    this.onAction.emit()
  }

}
