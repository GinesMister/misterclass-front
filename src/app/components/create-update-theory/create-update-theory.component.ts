import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TheoryElement, Unit } from '../../models/subjectDTO';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SubjectService } from '../../services/subject.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-create-update-theory',
  templateUrl: './create-update-theory.component.html',
  styleUrls: ['./create-update-theory.component.scss']
})
export class CreateUpdateTheoryComponent implements OnInit {

  @Output() onAction: EventEmitter<void | Observable<void>> = new EventEmitter<void | Observable<void>>()
  @Input() theoryElement!: TheoryElement
  @Input() unit!: Unit

  theoryElementForm!: FormGroup
  theoryFile!: File

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

  onUpload($event: any) {
    this.theoryFile = $event.target.files[0]
  }

  createUpdatetheoryElement() {
    if (!this.theoryElementForm.valid && !this.theoryFile) return

    if (this.theoryElement) {
      this.theoryElement.title = this.theoryElementForm.value.title
      this.theoryElement.description = this.theoryElementForm.value.description
      // Update
    } else {
      const newTheoryElement = new TheoryElement()
      newTheoryElement.description = this.theoryElementForm.value.description
      newTheoryElement.title = this.theoryElementForm.value.title
      this.onAction.emit(this.subjectService.createTheoryElement(this.unit, newTheoryElement, this.theoryFile))
    }

  }
  
  cancel() {
    this.onAction.emit()
  }

}
