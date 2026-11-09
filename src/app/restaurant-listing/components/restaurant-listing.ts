import { ChangeDetectorRef, Component } from '@angular/core';
import { Restaurant } from '../../shared/models/Restaurant';
import { RestaurantService } from '../service/restaurant-service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({ 
  imports: [CommonModule],
  selector: 'app-restaurant-listing',
  styleUrl: './restaurant-listing.css',
  templateUrl: './restaurant-listing.html',
})
export class RestaurantListing {
  public restaurantList : Restaurant[]; 
  constructor(private router:Router,
    private restaurantService: RestaurantService,
          private changeDetector:ChangeDetectorRef
){}
ngOnInit(){
  this.getAllRestaurants(); 
}
  getAllRestaurants() {
    this.restaurantService.getAllRestaurants().subscribe(
      data=>{
        this.restaurantList=data;
        this.changeDetector.markForCheck();
      }
    )
  }
  

onButtonClick(id: number) {
  this.router.navigate(['/food-catalogue',id]);
}
  getRandomNumber(min: number, max: number):number {
    return Math.floor(Math.random() *(max-min+1))+min;
  }
getRandomImage() {
const imageCount=6;
const randomIndex=this.getRandomNumber(1,imageCount);
return `${randomIndex}.jpeg`;
}

}
