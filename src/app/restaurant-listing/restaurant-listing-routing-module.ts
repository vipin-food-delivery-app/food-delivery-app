import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RestaurantListing } from './components/restaurant-listing';

const routes: Routes = [
  {path:'',component: RestaurantListing}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RestaurantListingRoutingModule {}
