import { Injectable, OnInit } from '@angular/core';
import { UserData } from '../models/userDataDTO';
import { AuthService } from './server-petitions/api/auth.service';
import { AuthRequest } from '../models/authRequestDTO';
import { Router } from '@angular/router';
import { UserApiService } from './server-petitions/api/user-api.service';
import { SubjectApiService } from './server-petitions/api/subject-api.service';

@Injectable({
  providedIn: 'root'
})
export class LoginInfoService {

  userData: UserData | undefined = undefined

  role: 'student' | 'teacher' = 'student'
  
  constructor(
    private userDataService: UserApiService,
    private authService: AuthService,
    private router: Router,
    private subjectDataService: SubjectApiService
  ) {
    // TODO SOLO EN EN DESARROLLO
    this.addLoggedUser(new AuthRequest(
      'gines', 
      '378e0a98c1a910fce259c5b90d42f706dc4d47625e4c55682122f138fb0756af'
    ))
  }

  isLogged = () => ! (this.userData === undefined)

  addLoggedUser(authRequest: AuthRequest) {
    authRequest.exists = true
    this.authService.logInRegister(authRequest).subscribe(res => {
      if (res) {
        this.updateUserData(authRequest.userId, true)
      }
    })
  }
  
  updateUserData(userId?: string, redirectToHome = false) {
    if (userId == undefined) userId = this.userData?.userId
    this.userDataService.getUserById(userId!).subscribe(res => {
      this.userData = res
      this.subjectDataService.getSubjectsCreatedByUserId(userId!).subscribe(res => {
        this.userData!.subjectsCreated = res
        if (redirectToHome) this.router.navigate(['/'])
      })
    })
  }
}
