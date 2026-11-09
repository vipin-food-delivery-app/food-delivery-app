import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { FoodItemCataloguePage } from '../../shared/models/FoodCataloguePage';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FoodItemService } from '../service/fooditem-service';
import { FoodItem } from '../../shared/models/FoodItem';

@Component({
  imports: [CommonModule],
  selector: 'app-food-catalogue',
  styleUrl: './food-catalogue.css',
  templateUrl: './food-catalogue.html',
})
export class FoodCatalogue {

  @Input() id!:number;
  foodItemCart:FoodItem[]=[];
  foodItemResponse:FoodItemCataloguePage;
  orderSummary: FoodItemCataloguePage;
  constructor(private router:Router,
    private foodItemService:FoodItemService,
    private changeDetector:ChangeDetectorRef){}
  ngOnInit(){
    this.getFoodCatalogue(this.id);
  }
  getFoodCatalogue(id:number) {
    this.foodItemService.getFoodItemsByRestaurant(id).subscribe(
      data=>{
        this.foodItemResponse=data;
        this.changeDetector.markForCheck();
      }
    )
  }
  increment(food: FoodItem) {
 food.quantity = (food.quantity ?? 0) + 1;
const index=this.foodItemCart.findIndex(item=>item.id==food.id);
if(index==-1){
  this.foodItemCart.push(food);
}else{
  this.foodItemCart[index]=food;
}
}
decrement(food: FoodItem) {
if ((food.quantity ?? 0) > 0) {
  food.quantity = (food.quantity ?? 0) - 1;
}
const index=this.foodItemCart.findIndex(item=>item.id==food.id);
if(this.foodItemCart[index].quantity==0){
  this.foodItemCart.splice(index,1);
}else{
  this.foodItemCart[index]=food;
}
}
onCheckOut() {
this.foodItemCart;
this.orderSummary={
  foodItemsList:[],
  restaurant:undefined 
}
this.orderSummary.foodItemsList=this.foodItemCart;
this.orderSummary.restaurant=this.foodItemResponse.restaurant;
this.router.navigate(['/orderSummary'],{queryParams:{data:JSON.stringify(this.orderSummary)}})
}
}
