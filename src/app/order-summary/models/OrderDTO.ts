import { FoodItem } from "../../shared/models/FoodItem";
import { Restaurant } from "../../shared/models/Restaurant";

export interface OrderDTO{
     foodItemsList?:FoodItem[];
     userId?:number;
      restaurant?:Restaurant;
}