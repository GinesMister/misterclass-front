import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SubjectService } from '../../services/subject.service';
import { Unit } from '../../models/subjectDTO';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-update-unit',
  templateUrl: './create-update-unit.component.html',
  styleUrls: ['./create-update-unit.component.scss']
})
export class CreateUpdateUnitComponent implements OnInit {

  @Output() onSave: EventEmitter<void> = new EventEmitter<void>()
  @Input() unit!: Unit

  unitForm!: FormGroup

  constructor(
    private subjectService: SubjectService,
    private fb: FormBuilder
  ) { }
  
  ngOnInit() {
    this.unitForm = this.fb.group({
      title: [this.unit ? this.unit.title : '', Validators.required]
    });
  }

  createUpdateUnit() {
    if (!this.unitForm.valid) return

    if (this.unit) {
      this.unit.title = this.unitForm.value.title
      this.subjectService.createUpdateUnit(this.unit, false) 
    } else {
      const newUnit = new Unit(this.unitForm.value.title)
      this.subjectService.createUpdateUnit(newUnit)
    }

    this.onSave.emit()
  }
  
  cancel() {
    this.onSave.emit()
  }
}
