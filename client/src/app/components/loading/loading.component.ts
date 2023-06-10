import { Component, OnInit } from '@angular/core';
import { LoadingService } from 'src/app/services/loading.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css'],
})
export class LoadingComponent implements OnInit {
  isLoading!: boolean;

  constructor(
    private loadingService: LoadingService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.loadingService.isLoading$.subscribe((isLoading) => {
      this.spinner.show();
      this.isLoading = isLoading;
    });
  }
}
