import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { product } from '../model/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private products!: Array<product>;

  constructor() {
    this.products = [
      { id: 1, name: "Computer", price: 3000 },
      { id: 2, name: "Printer", price: 650 },
      { id: 3, name: "Smart Phone", price: 1400 },

    ];
  }

  public getAllProducts() : Observable <product[]>{
    //ici j'ai creer une erreur pour test son affichage dans html 'errorMsg'
    /*let rdm = Math.random();
    if(rdm <0.5) return throwError(()=>new Error("internet error"));
    else return of(this.products);*/
    return of(this.products);
  }

  public deleteProduct(id:number) : Observable<boolean>{
    this.products= this.products.filter(p=>p.id!=id);
    return of(true);
  }


}
