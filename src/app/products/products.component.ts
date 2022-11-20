import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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
  searchForm!: FormGroup;
  currentPage: number = 0;
  pageSize: number = 6;
  totalPage: number = 0;
  currentAction: string = "all";

  constructor(private productService: ProductService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      keyword: this.fb.control(null)
    })

    //this.handelGetAllProducts();
    this.handelGetPageProducts();
  }


  handelGetPageProducts() {
    this.productService.getPageProduct(this.currentPage, this.pageSize).subscribe({
      next: (data) => {
        this.products = data.products;
        this.totalPage = data.totalPages;
        //console.log(this.totalPage);
      },
      error: err => {
        this.errorMsg = err;
      }
    });
  }

  goToPage(i: number) {
    this.currentPage = i;
    if(this.currentAction=="all")
    this.handelGetPageProducts();
    else
    this.handelSearchProduct();
  }

  handelGetAllProducts() {
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
    //sans utiliser le service
    /*let index = this.products.indexOf(p);
    this.products.splice(index, 1);*/

    let conf = confirm("ete vous sur de vouloir supprimer?")
    if (conf == false
    ) return;
    this.productService.deleteProduct(p.id).subscribe({
      next: data => {
        //ici on recharge tous les produits càd il recupére de backend et affiche c lourd
        //this.handelGetAllProducts();

        //coté frontend just supprimer l'element de tableau
        let index = this.products.indexOf(p);
        this.products.splice(index, 1);
      }
    });

  }

  handelSetPromotion(p: product) {
    let prom = p.promotion;
    this.productService.setPromotion(p.id).subscribe({
      next: data => {
        p.promotion = !prom;
      },
      error: err => {
        this.errorMsg = err;
      }
    });
  }

  handelSearchProduct() {
    this.currentAction="search";
    this.currentPage=0;
    let keyword = this.searchForm.value.keyword;
    this.productService.searchProduct(keyword,this.currentPage,this.pageSize).subscribe({
      next: data => {
        this.products = data.products;
        this.totalPage = data.totalPages;
      }
    });
  }


}
