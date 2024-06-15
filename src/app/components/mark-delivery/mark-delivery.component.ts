import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SubjectService } from '../../services/subject.service';
import { Delivery, Unit } from '../../models/subjectDTO';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-mark-delivery',
  templateUrl: './mark-delivery.component.html',
  styleUrls: ['./mark-delivery.component.scss']
})
export class MarkDeliveryComponent implements OnInit {

  @Output() onAction: EventEmitter<void | Observable<void>> = new EventEmitter<void | Observable<void>>()
  @Input() delivery!: Delivery

  markForm!: FormGroup
  mark!: number

  constructor(
    private subjectService: SubjectService,
    private fb: FormBuilder
  ) { }
  
  ngOnInit() {
    this.markForm = this.fb.group({
      mark: [this.delivery.mark ? this.delivery.mark : '', [Validators.required, Validators.pattern(/^-?\d*[.,]?\d{0,2}$/)]]
    });
  }

  markDelivery() {
    if (!this.markForm.valid) return

    const newMark = parseFloat(this.markForm.value.mark.replace(',', '.'))
    this.onAction.emit(this.subjectService.markDelivery(this.delivery, newMark))
  }
  
  cancel() {
    this.onAction.emit()
  }
}
