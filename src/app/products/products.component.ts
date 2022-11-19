import { Component, OnInit } from '@angular/core';
import { COMPOSITION_BUFFER_MODE } from '@angular/forms';
import { product } from '../model/product.model';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
 products!: Array<product>;
  errorMsg!: string;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe({
      next: (data) => {
        this.products = data;
      },
      error: err => {
        this.errorMsg = err;
      }

    });
  }

  handelDeleteProduct(p: product) {
    let index = this.products.indexOf(p);
    this.products.splice(index, 1);
  }

}
