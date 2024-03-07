import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Credentials } from '../modal/credentials';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formValue!: FormGroup;
  credentials: Credentials = new Credentials;
  constructor(private formBuilder: FormBuilder, private http: HttpClient,
    private router: Router) { }

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      email :[''],
      password: [''],
    })
  }

  loginForm(){
     this.http.get<any>("http://localhost:3000/comments").subscribe((res => {
      const user = res.find((a:any) => {
        return a.email === this.formValue.value.email && 
        a.password === this.formValue.value.password
      })
      if(user){
        alert("Login successfull");
        this.formValue.reset();
        this.router.navigate(['restoDash'])
      }else{
        alert("Wrong Credentials");
      }
     }))
  }
}
