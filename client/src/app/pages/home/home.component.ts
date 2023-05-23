import { Component,OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  productsSubscription: Subscription | undefined;
  products: Array<Product> | undefined;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void {
    this.productsSubscription = this.productService
      .getAllProducts()
      .subscribe((_products) => {
        this.products = _products;
      });
  }

}
