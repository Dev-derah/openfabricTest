import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { faEnvelope,faKey,faUser,faPhone } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  faUser = faUser;
  faEmail = faEnvelope;
  faPassword = faKey;
  faPhone= faPhone;
  constructor(
    private formBuilder: FormBuilder,
    private service: UserService,
    private route: Router
  ) {}

  RegistrationForm!: FormGroup;

  ngOnInit() {
    this.RegistrationForm = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

    submitForm() {
    if (this.RegistrationForm.valid) {
      this.service.registerUser(this.RegistrationForm.value).subscribe({
        next: () => {
          this.service.setLoggedIn(true);
          this.route.navigateByUrl('/login');
          alert('Registration successful');
        },
        error: (err) => {
          alert(err.error.message);
        },
      });
      console.log(this.RegistrationForm.value)
    }else {
      this.RegistrationForm.markAllAsTouched();
  }

}

}