import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signup!: FormGroup;
  constructor(private formBuilder: FormBuilder, private http: HttpClient,
    private router: Router) { }

  ngOnInit(): void {
    this.signup = this.formBuilder.group({
      name:[''],
      email:[''],
      mobile:[''],
      password:['']
    })
  }

  signUpForm(){
    this.http.post<any>("http://localhost:3000/comments", this.signup.value).subscribe((res => {
     alert("Registration Successfull");  
     console.log(res);
     this.signup.reset();
     this.router.navigate(['login']);
    }))
  }

}
