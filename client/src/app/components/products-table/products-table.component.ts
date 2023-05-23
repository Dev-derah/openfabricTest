import { Component,Input } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-products-table',
  templateUrl: './products-table.component.html',
  styleUrls: ['./products-table.component.css'],
})
export class ProductsTableComponent {
  @Input()
  products!: Array<Product>;
  EditProductForm!: FormGroup;
  selectedProduct!: Product | null;
  selectedFile: any;

  constructor(
    private productService: ProductService,
    private formBuilder: FormBuilder
  ) {}

  deleteProduct(id: string) {
    this.productService.deleteProduct(id).subscribe();
    window.location.reload();
  }

}
