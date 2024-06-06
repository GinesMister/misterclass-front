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
      this.subjectService.updateSubjectData(
        this.loginInfo.userData?.subjectsSubscribed.find(
          subject => subject.accessCode === this.subjectCode
        )?.subjectId
      )
      // JUST FOR TESTING

      // Create Unit
      // setTimeout(() => {
      //   this.subjectService.createUpdateUnit(new Unit('Unidad 0: Inicio'))
      // }, 3000);

      // Create Task
      // setTimeout(() => {
      //   const task = new Task()
      //   task.title = 'Esta tarea es la primera que se entrega'
      //   task.description = 'Visualiza este vídeo y resonde a las preguntas que se adjuntan en el PDF'
      //   task.deadline = new Date('2023-07-06T17:17:09.075Z')
      //   this.subjectService.createUpdateTask(this.subjectService.subjectData?.units![0]!, task)
      // }, 3000);

      // Update Task
      // setTimeout(() => {
      //   const task = this.subjectService.subjectData?.units![0].tasks![0]
      //   task!.title = 'He actualizado la tarea y ahora tienes que entregar un dibujo'
      //   this.subjectService.createUpdateTask(this.subjectService.subjectData?.units![0]!, task!, false)
      // }, 3000);
    })
  }

  isSubjectColorDark() {
    return isColorDark(this.subjectService.subjectData?.color!)
  }  
}
