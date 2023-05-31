import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from 'src/app/services/product.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
})
export class CreatePostComponent {
  PostForm!: FormGroup;
  selectedFile: File | '' = '';

  constructor(
    private formBuilder: FormBuilder,
    private service: ProductService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.PostForm = this.formBuilder.group({
      productName: ['', [Validators.required]],
      productImage: ['', [Validators.required]],
      productDescription: ['', [Validators.required]],
      price: ['', [Validators.required, Validators.pattern('^([1-9][0-9]*)$')]],
    });
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  submitForm() {
    if (this.PostForm.valid) {
      let formData = new FormData();
      const { productName, productDescription, price } = this.PostForm.value;
      formData.append('productName', productName);
      formData.append('productDescription', productDescription);
      formData.append('price', price);
      formData.append('productImage', this.selectedFile);
      // Process the form data
      this.service.postProduct(formData).subscribe({
        next: () => {
          this.PostForm.reset();
          window.location.reload();
          alert('Post successful');
        },
        error: (err) => {
          alert(`Error: ${err.error.message}`);
          this.PostForm.reset();
        },
      });
    } else {
      this.PostForm.markAllAsTouched();
    }
  }
}
