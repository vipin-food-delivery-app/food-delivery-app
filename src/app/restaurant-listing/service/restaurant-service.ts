import { ChangeDetectorRef, Injectable } from "@angular/core";
import { API_URL_RL } from "../../constants/url";
import { HttpClient } from "@angular/common/http";
import { catchError, Observable, throwError } from "rxjs";
import { log } from "console";
@Injectable({
    providedIn:'root'
})
export class RestaurantService{
    private apiUrl=API_URL_RL+'/restaurant/fetchAllRestaurants';
    constructor(private http:HttpClient,
    ){}
    getAllRestaurants():Observable<any>{
        return this.http.get<any>(`${this.apiUrl}`)
        .pipe(
            catchError(this.handleError)
        );
    }

    private handleError(handleError: any){
        console.error('An error occured',handleError);
         return throwError(()=> 
            new Error(handleError.message || handleError));
    }
}