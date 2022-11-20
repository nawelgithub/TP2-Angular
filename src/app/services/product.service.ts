import { Injectable } from '@angular/core';
import { UUID } from 'angular2-uuid';
import { Observable, of, throwError } from 'rxjs';
import { PageProduct, product } from '../model/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private products!: Array<product>;



  constructor() {
    this.products = [
      { id: UUID.UUID(), name: "Computer", price: 3000, promotion: true },
      { id: UUID.UUID(), name: "Printer", price: 650, promotion: false },
      { id: UUID.UUID(), name: "Smart Phone", price: 1400, promotion: true }
    ];
    //je vais dupliquer les données pour tester la pagination

    for (let i = 0; i < 20; i++)
      this.products.push({ id: UUID.UUID(), name: "Computer", price: 3000, promotion: true });
    this.products.push({ id: UUID.UUID(), name: "Printer", price: 650, promotion: false });
    this.products.push({ id: UUID.UUID(), name: "Smart Phone", price: 1400, promotion: true });
  }

  public getAllProducts(): Observable<product[]> {
    //ici j'ai creer une erreur pour test son affichage dans html 'errorMsg'
    /*let rdm = Math.random();
    if(rdm <0.5) return throwError(()=>new Error("internet error"));
    else return of(this.products);*/
    return of(this.products);
  }



  public getPageProduct(page: number, size: number): Observable<PageProduct> {
    let index = page * size;
    // les deux ~~ pour dire c la division entière => pas nombre aprés la virgule
    let totalPages = ~~(this.products.length / size);
    if (this.products.length % size != 0)
      totalPages++;

    let PageProducts = this.products.slice(index, index + size);
    return of({ page: page, size: size, totalPages: totalPages, products: PageProducts });
  }

  public deleteProduct(id: string): Observable<boolean> {
    this.products = this.products.filter(p => p.id != id);
    return of(true);
  }

  setPromotion(id: string): Observable<boolean> {
    let product = this.products.find(p => p.id == id);
    if (product != undefined) {
      product.promotion = !product.promotion;
      return of(true);
    }
    else {
      return throwError(() => new Error("products not found"));
    }
  }

  searchProduct(keyword: string, page: number, size: number): Observable<PageProduct> {
    let result = this.products.filter(p => p.name.includes(keyword));
    let index = page * size;
    let totalPages = ~~(result.length / size);
    if (this.products.length % size != 0)
      totalPages++;

    let PageProducts = result.slice(index, index + size);

    return of({ page: page, size: size, totalPages: totalPages, products: PageProducts });
  }

}
