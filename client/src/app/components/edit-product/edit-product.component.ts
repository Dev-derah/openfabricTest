import { Component,OnInit,Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css'],
})
export class EditProductComponent implements OnInit {
  EditProductForm!: FormGroup;
  @Input() selectedProduct!: Product;
  selectedFile: File | '' = '';

  constructor(
    private formBuilder: FormBuilder,
    private service: ProductService,
  ) {}

  ngOnInit() {
    this.EditProductForm = this.formBuilder.group({
      productName: [this.selectedProduct.productName, [Validators.required]],
      productDescription: [this.selectedProduct.productDescription, [Validators.required]],
      price: [this.selectedProduct.price, [Validators.required, Validators.pattern('^([1-9][0-9]*)$')]],
    });
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  submitForm() {}
}
