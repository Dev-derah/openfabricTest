import { Component,OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product';

import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  constructor(
    private service: ProductService,
    private route: ActivatedRoute
  ) {}

  ngOnInit():void {
    this.route.params.subscribe((params) =>
      this.getProductDetails(params['productId'])
    );
  }
  productDetails: Product | undefined;

  getProductDetails(productId: string) {
    this.service
      .getProductDetails(productId)
      .subscribe((product: Product) => (this.productDetails = product));
  }
}
