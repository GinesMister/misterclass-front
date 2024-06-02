import { Injectable } from '@angular/core';
import { UserData } from '../models/userDataDTO';
import { GetUserDataService } from './server-petitions/get-user-data.service';
import { AuthService } from './server-petitions/auth.service';
import { AuthRequest } from '../models/authRequestDTO';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginInfoService {

  userData: UserData | undefined = undefined
  
  constructor(
    private userDataService: GetUserDataService,
    private authService: AuthService,
    private router: Router
  ) { }

  isLogged = () => ! (this.userData === undefined)

  addLoggedUser(authRequest: AuthRequest) {
    authRequest.exists = true
    this.authService.logInRegister(authRequest).subscribe(res => {
      if (res) {
        this.userDataService.getUserById(authRequest.userId).subscribe(res => {
          this.userData = res
          this.router.navigate(['/'])
        })
      }
    })
  }
}
