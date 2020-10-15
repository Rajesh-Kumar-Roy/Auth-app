import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { promise } from 'protractor';

@Injectable({
  providedIn: 'root'
})
export class UserService {
 readonly baseUrl = 'http://localhost:63527/api/applicationUser/Register';
 readonly baseUrl2 = 'http://localhost:63527/api';
  constructor(private fb: FormBuilder, private http: HttpClient) { }
  formModel = this.fb.group({
    UserName : ['', Validators.required],
    Email : ['', Validators.email],
    FullName: [''],
    Passwords: this.fb.group({
      Password: ['', [Validators.required, Validators.minLength(4)]],
      ConfirmPassword: ['', Validators.required]
    }, {validator: this.comparePasswords}),
  });
  // tslint:disable-next-line: typedef
  comparePasswords(fb: FormGroup){
    const comfirmPasswordCtrl = fb.get('ConfirmPassword');
    if (comfirmPasswordCtrl.errors == null || 'passwordMisMatch' in comfirmPasswordCtrl.errors) {
      if (fb.get('Password').value != comfirmPasswordCtrl.value){
        comfirmPasswordCtrl.setErrors({passwordMisMatch: true});
      }
      else{
        comfirmPasswordCtrl.setErrors(null);
      }
     }
  }
  register(): any{
    console.log("ok");
    const body = {
      UserName: this.formModel.value.UserName,
      Email: this.formModel.value.Email,
      FullName: this.formModel.value.FullName,
      Password: this.formModel.value.Passwords.Password

    };
    return this.http.post(this.baseUrl, body);
  }
  logIn(formData): any{
    return this.http.post(this.baseUrl2 + '/applicationUser/Login', formData);
  }
  getUserProfile(){
    // const tokenHeader = new HttpHeaders({Authorization: 'Bearer ' + localStorage.getItem('token')});
    return this.http.get(this.baseUrl2 + '/userProfile');
  }
}
