import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './header/components/header';
import { RestaurantListing } from './restaurant-listing/components/restaurant-listing';
import { RestaurantListingRoutingModule } from './restaurant-listing/restaurant-listing-routing-module';
import { HttpClientModule } from '@angular/common/http';

@Component({
  imports: [RouterOutlet, Header],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('food-delivery-app');
}
