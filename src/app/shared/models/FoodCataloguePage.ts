import { FoodItem } from "./FoodItem";
import { Restaurant } from "./Restaurant";

export interface FoodItemCataloguePage{
  foodItemsList?:FoodItem[];
      restaurant?:Restaurant;
}