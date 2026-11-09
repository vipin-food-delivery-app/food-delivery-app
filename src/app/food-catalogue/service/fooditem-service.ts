import { catchError, Observable, throwError } from "rxjs";
import { API_URL_FC } from "../../constants/url";
import { HttpClient } from "@angular/common/http";
import { error } from "console";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn:'root'
})
export class FoodItemService{
    private apiUrl=API_URL_FC+'/foodCatalogue/fetchRestaurantAndFoodItemsById/';
    constructor(private http:HttpClient){}
    getFoodItemsByRestaurant(id:number):Observable<any>{
        return this.http.get<any>(`${this.apiUrl+id}`)
        .pipe(
            catchError(this.handleError)
        )
    }
    handleError(handleError: any){
        console.error('An error occured',handleError);
        return  throwError(()=>{
             new Error(handleError.message||handleError);
        })
    }
}