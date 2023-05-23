import { Component, OnInit } from '@angular/core';
import { faUser, faEnvelope, faKey } from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  faUser = faUser;
  faEmail = faEnvelope;
  faPassword = faKey;
  constructor(
    private formBuilder: FormBuilder,
    private service: UserService,
    private route: Router
  ) {}

  LoginForm!: FormGroup;

  ngOnInit() {
    this.LoginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }
  submitForm() {
    if (this.LoginForm.valid) {
      // Process the form data
      this.service.loginUser(this.LoginForm.value).subscribe({
        next: () => {
          this.service.setLoggedIn(true);
          this.route.navigateByUrl('/dashboard');
          alert('login successful');
        },
        error: (err) => {
          alert(err.error.message);
        },
      });
    }else {
      this.LoginForm.markAllAsTouched();
  }
}
}
