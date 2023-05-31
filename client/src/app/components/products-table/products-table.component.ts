import { Component, Input,Output } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products-table',
  templateUrl: './products-table.component.html',
  styleUrls: ['./products-table.component.css'],
})
export class ProductsTableComponent {
  @Input()
  products!: Array<Product>;

  constructor(
    private productService: ProductService,
    private formBuilder: FormBuilder,
    private route:Router
  ) {}

  deleteProduct(id: string) {
    this.productService.deleteProduct(id).subscribe();
    window.location.reload();
  }
}
