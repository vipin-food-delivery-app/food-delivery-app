import { HttpClient, HttpHeaders } from "@angular/common/http";
import { API_URL_Order } from "../../constants/url";
import { Observable, throwError } from "rxjs";
import { Injectable } from "@angular/core";
@Injectable({
    providedIn:'root'
}
)

export class OrderService{
    private apiUrl=API_URL_Order+'/order/saveOrder';
    constructor(private http:HttpClient){
    }
    httpOptions={
        headers:new HttpHeaders({
            'Content-Type':'text/plain',
            'Access-Control-Allow-Origin':'http://localhost:4200'
        })
    };
    saveOrder(data:any):Observable<any>{
        return this.http.post<any>(this.apiUrl,data);
    }
    private handleError(handleError:any){
        console.error('An error Occurred',handleError);
        return throwError(()=>new Error(handleError.message|| handleError));
        
    }
}