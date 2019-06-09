import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpService } from 'app/services/http.service';
import { Router } from '@angular/router';
import { SessionService } from 'app/services/session.service';

@Component({
  selector: 'app-root',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  loginForm: FormGroup;
  message: String;

  constructor(private http: HttpService, private router: Router, private session: SessionService) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      "email": new FormControl('', [Validators.pattern("[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)"), Validators.required]),
      "password": new FormControl('', [Validators.pattern("[a-zA-Z0-9.!#$%&'*@+/=?^_`{|}~-]{8,}"), Validators.required]),
    });
  }

  login() {
    if (this.loginForm.valid) {

      //Get necessary data
      let email = this.loginForm.value.email;
      let password = this.loginForm.value.password;

      this.session.validateLogin(email, password).then((result) => {
        console.log(result);
        if(result){
          this.router.navigate(['store'])
        }else{
          this.message = "Usuario no registrado.";
        }
      });
      
    }
  }

  get email() { return this.loginForm.get('email'); }
  get password() { return this.loginForm.get('password'); }
}
