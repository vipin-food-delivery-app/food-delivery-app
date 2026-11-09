import { ChangeDetectorRef, Component } from '@angular/core';
import { OrderService } from '../service/order-service';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderDTO } from '../models/OrderDTO';
import { CommonModule } from '@angular/common';
import { error } from 'console';

@Component({
  imports: [CommonModule],
  selector: 'app-order-summary',
  styleUrl: './order-summary.css',
  templateUrl: './order-summary.html',
})
export class OrderSummary {
  obj: any;
  orderSummary: OrderDTO;
  total: any;
  showDialog: boolean;
  constructor(private changeDetector:ChangeDetectorRef,private orderService: OrderService, private router: Router, private route: ActivatedRoute) { }
  ngOnInit() {
    const data = this.route.snapshot.queryParams['data'];
    this.obj = JSON.parse(data);
    this.obj.userId = 1;
    this.orderSummary = this.obj;
    this.total = (this.orderSummary.foodItemsList ?? []).reduce((a: any, c: any) => {
      return a + (c.quantity * c.price);
    }, 0);

  }

  saveOrder() {
    this.orderService.saveOrder(this.orderSummary)
      .subscribe({
        next: response => {
          this.showDialog = true;
          this.changeDetector.markForCheck()
        },
        error: error => {
          console.error('Failed to save data:', error);
        }
      }

      );
  }
  closeDialog() {
    this.showDialog=false;
    this.router.navigate(['/']);
  }

}
