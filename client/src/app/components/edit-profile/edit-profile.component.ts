import { Component,OnInit,Input,Output,EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from 'src/app/models/product';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css'],
})
export class EditProfileComponent implements OnInit {
  @Input()
  user!: User;
  @Input() selectedProduct!: Product;
  @Output() selectedProductChange = new EventEmitter<Product>();
  EditProfileForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService
  ) {}
  ngOnInit() {
    this.EditProfileForm = this.formBuilder.group({
      firstName: [this.user.firstName, [Validators.required]],
      lastName: [this.user.lastName, [Validators.required]],
      phoneNumber: [this.user.phoneNumber, [Validators.required]],
      email: [this.user.email, [Validators.required, Validators.email]],
    });
  }

  submitForm() {
    if (this.EditProfileForm.valid) {
      // Process the form data
      this.userService.updateUser(this.EditProfileForm.value).subscribe({
        next: () => {
          window.location.reload();
          alert('Profile Updated successfully');
        },
        error: (err) => {
          console.log(FormData)
          alert(err.error.message);
        },
      });
    } else {
      this.EditProfileForm.markAllAsTouched();
      alert(this.EditProfileForm.invalid.valueOf);
    }
  }
}
