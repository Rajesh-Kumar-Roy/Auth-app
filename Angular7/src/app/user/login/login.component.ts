import { ToastrService } from 'ngx-toastr';
import { UserService } from './../../shared/user.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formModel = {
    UserName: '',
    Password: ''
  };
  constructor(private userService: UserService, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    if ( localStorage.getItem('token') != null){
      this.router.navigateByUrl('/home');
    }
  }
  onSubmit(form: NgForm): void{
    this.userService.logIn(form.value).subscribe((res: any) => {
      localStorage.setItem('token', res.token);
      this.router.navigateByUrl('/home');
    },
    err => {
      if ( err.status == 400){
        this.toastr.error('Incorrect UserName or Password!!', 'Authentication Failed!!');
      }
      else{
        console.log(err);
      }
    }
    );
  }

}
