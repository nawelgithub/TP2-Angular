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
      { id: 1, name: "Computer", price: 3000, promotion: true },
      { id: 2, name: "Printer", price: 650, promotion: false },
      { id: 3, name: "Smart Phone", price: 1400, promotion: true },

    ];
  }

  public getAllProducts(): Observable<product[]> {
    //ici j'ai creer une erreur pour test son affichage dans html 'errorMsg'
    /*let rdm = Math.random();
    if(rdm <0.5) return throwError(()=>new Error("internet error"));
    else return of(this.products);*/
    return of(this.products);
  }

  public deleteProduct(id: number): Observable<boolean> {
    this.products = this.products.filter(p => p.id != id);
    return of(true);
  }

  setPromotion(id: number): Observable<boolean> {
    let product = this.products.find(p => p.id == id);
    if (product != undefined) {
      product.promotion = !product.promotion;
      return of(true);
    }
    else {
      return throwError(() => new Error("products not found"));
    }
  }

  searchProduct(keyword: string): Observable<product[]> {
    let products = this.products.filter(p => p.name.includes(keyword));
    return of(products);
  }

}
