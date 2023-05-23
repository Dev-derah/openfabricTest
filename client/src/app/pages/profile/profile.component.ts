import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './profile.component.html',
})
export class ProfileComponent implements OnInit {
  user: User | undefined;

  constructor(
    private service: UserService,
    private route: Router,
    private productService: ProductService,
  ) {}

  ngOnInit(): void {
    this.getUserProfile();
  }
  getUserProfile() {
    this.service.getUserProfile().subscribe({
      next: (_userDetails) => {
        this.user = _userDetails.user;
        console.log(this.service.isLoggedIn$)
        this.service.setLoggedIn(true);
      },
      error: (err) => {
        console.log(this.service.isLoggedIn$);
        this.service.setLoggedIn(false);
        this.route.navigateByUrl('/login');
        alert(err.error.message);
      },
    });
  }

  deleteProduct(id: string) {
    this.productService.deleteProduct(id).subscribe();
    window.location.reload();
  }

  editProduct(product: any) {
    console.log(product);
  }

  exploreProducts() {
    this.route.navigateByUrl('/home');
  }
}
