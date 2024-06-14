import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TheoryElement } from '../../models/subjectDTO';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SubjectService } from '../../services/subject.service';

@Component({
  selector: 'app-create-update-theory',
  templateUrl: './create-update-theory.component.html',
  styleUrls: ['./create-update-theory.component.scss']
})
export class CreateUpdateTheoryComponent implements OnInit {

  @Output() onAction: EventEmitter<void> = new EventEmitter<void>()
  @Input() theoryElement!: TheoryElement

  theoryElementForm!: FormGroup

  constructor(
    private subjectService: SubjectService,
    private fb: FormBuilder
  ) { }
  
  ngOnInit() {
    this.theoryElementForm = this.fb.group({
      title: [this.theoryElement ? this.theoryElement.title : '', Validators.required],
      description: [this.theoryElement ? this.theoryElement.description : '', Validators.required]
    });
  }

  createUpdatetheoryElement() {
    // TODO añadir condición de subir archivo
    if (!this.theoryElementForm.valid) return

    if (this.theoryElement) {
      this.theoryElement.title = this.theoryElementForm.value.title
      // this.subjectService.createTheoryElement(this.theoryElement, false) 
    } else {
      const newTheoryElement = new TheoryElement()
      newTheoryElement.description = this.theoryElementForm.value.description
      // TODO
      // this.subjectService.createUpdateTheoryElement(newTheoryElement)
    }

    this.onAction.emit()
  }
  
  cancel() {
    this.onAction.emit()
  }

}
