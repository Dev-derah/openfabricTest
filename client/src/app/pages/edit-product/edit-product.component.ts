import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css'],
})
export class EditProductComponent {
  EditProductForm!: FormGroup;
  productDetails: Product | undefined;
  selectedFile: File | '' = '';

  constructor(
    private route: ActivatedRoute,
    private service: ProductService,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router:Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) =>
      this.getProductDetails(params['productId'])
    );
    this.EditProductForm = this.formBuilder.group({
      productName: ['', Validators.required],
      productDescription: ['', Validators.required],
      price: ['', Validators.required],
      productImage: '',
    });
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  getSelectedImageUrl() {
    if (this.selectedFile) {
      return URL.createObjectURL(this.selectedFile);
    } else {
      return this.productDetails?.productImage || '';
    }
  }

  getProductDetails(productId: string) {
    this.service.getProductDetails(productId).subscribe((product: Product) => {
      this.userService.setLoggedIn(true);
      this.productDetails = product;
      this.setFormValues();
    });
  }

  setFormValues() {
    if (this.productDetails) {
      this.EditProductForm.patchValue({
        productName: this.productDetails.productName,
        productDescription: this.productDetails.productDescription,
        price: this.productDetails.price,
        productImage: '',
      });
    }
  }

  onSubmit() {
    let formData = new FormData();
    const { productName, productDescription, price } =
      this.EditProductForm.value;
    formData.append('productName', productName);
    formData.append('productDescription', productDescription);
    formData.append('price', price);
    if (this.selectedFile) {
      formData.append('productImage', this.selectedFile);
    }
    // Handle form submission here
    this.service.updateProduct(this.productDetails?._id, formData).subscribe({
      next: () => {
        alert('Product Updated successfully');
        this.router.navigateByUrl('/dashboard');
      },
      error: (err) => {
        alert(`Error: ${err.error.message}`);
      },
    });
    
  }
}
