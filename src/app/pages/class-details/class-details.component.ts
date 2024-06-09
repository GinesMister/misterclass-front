import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginInfoService } from '../../services/login-info.service';
import { SubjectService } from '../../services/subject.service';
import { isColorDark } from '../../functions/colorData';
import { Task, Unit } from '../../models/subjectDTO';

@Component({
  selector: 'app-class-details',
  templateUrl: './class-details.component.html',
  styleUrls: ['./class-details.component.scss']
})
export class ClassDetailsComponent implements OnInit {
  
  subjectCode: string = ''

  isCreateUnitVisible = false

  unitToUpdate!: Unit | undefined
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public loginInfo: LoginInfoService,
    public subjectService: SubjectService
  ) { }
  
  ngOnInit() {
    if (!this.loginInfo.isLogged())
      this.router.navigate(['/iniciar-sesion']);
    
    this.route.params.subscribe(params => {
      this.subjectCode = params['id']

      // Check on subscribed
      let subjectId = this.loginInfo.userData?.subjectsSubscribed.find(
        subject => subject.accessCode === this.subjectCode
      )?.subjectId
      this.loginInfo.role = 'student'

      // Check on created
      if (!subjectId) {
        subjectId = this.loginInfo.userData?.subjectsCreated.find(
          subject => subject.accessCode === this.subjectCode
        )?.subjectId
        this.loginInfo.role = 'teacher'
      }

      this.subjectService.updateSubjectData(subjectId)
      // JUST FOR TESTING

      // Create Unit
      // setTimeout(() => {
      //   this.subjectService.createUpdateUnit(new Unit('Unidad 0: Repaso del curso pasado'))
      // }, 3000);

      // Create Task
      // setTimeout(() => {
      //   const task = new Task()
      //   task.title = 'Esta tarea tarea se entre antes que la primera'
      //   task.description = 'Visualiza este vídeo y resonde a las preguntas que se adjuntan en el PDF'
      //   task.deadline = '2023-04-06T17:17:09.075Z'
      //   this.subjectService.createUpdateTask(this.subjectService.subjectData?.units![0]!, task)
      // }, 4000);

      // Update Task
      // setTimeout(() => {
      //   const task = this.subjectService.subjectData?.units![0].tasks![0]
      //   task!.title = 'He actualizado la tarea y ahora tienes que entregar un dibujo'
      //   this.subjectService.createUpdateTask(this.subjectService.subjectData?.units![0]!, task!, false)
      // }, 3000);
    })
  }

  onUpdateUnit(unit: Unit) {
    this.unitToUpdate = unit
    this.switchCreateUnitVisible()
  }

  onCreateUnit() {
    this.unitToUpdate = undefined
    this.switchCreateUnitVisible()
  }

  switchCreateUnitVisible = () => this.isCreateUnitVisible = !this.isCreateUnitVisible

  isSubjectColorDark() {
    return isColorDark(this.subjectService.subjectData?.color!)
  }

  // Develop features
  // file?: File
  // onUploadConfirm() {
  //   console.log(this.file)
  //   if (!this.file) {
  //     console.log('Add a file first')
  //     return
  //   }

  //   this.subjectService.createDelivery(new Task (1), this.file)
  // }

  // onUpload(event: any) {
  //   this.file = event.target.files[0]
  // }
}
