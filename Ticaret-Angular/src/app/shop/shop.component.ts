import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IBrand } from '../shared/models/IBrand';
import { IProduct } from '../shared/models/IProduct';
import { IProductType } from '../shared/models/productType';
import { ShopParams } from '../shared/models/shopParams';
import { ShopService } from './shop.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {
  
@ViewChild('search',{static:true}) searchTerm:ElementRef;

  products:IProduct[] = [];
  brands:IBrand[] = [];
  types:IProductType[] = [];
  shopParams=new ShopParams();
  totalCount:number;

  sortOptions=[
    {name:'Alfabetik',value:'productName'},
    {name:'Fiyata Göre: Önce Düşük',value:'priceAsc'},
    {name:'Fiyata Göre: Önce Yüksek',value:'priceDesc'}
  ];

  constructor(private shopService:ShopService) { }

  ngOnInit(): void {
    this.getProducts();
    this.getBrands();
    this.getTypes();
    
  }

  getProducts() {
    this.shopService.getProducts(this.shopParams).subscribe(response => {
      this.products=response.data;
      this.shopParams.pageNumber=response.pageIndex;
      this.shopParams.pageSize=response.pageSize;
      this.totalCount=response.count;
      console.log(response)

    },err => {
      console.log(err)
    });
  }

  getBrands() {
    this.shopService.getBrands().subscribe(response => {

      var firstItem = {productBrandId:0 , productBrandName:'All'};
      this.brands=[firstItem , ...response];
    },err => {
      console.log(err)
    });
  }

  getTypes() {
    this.shopService.getTypes().subscribe(response => {

      var firstItem = {productTypeId:0 , productTypeName:'All'};

      this.types=[firstItem , ...response];
    },err => {
      console.log(err)
    });
  }

  onBrandSelected(brandId:number) {
    this.shopParams.brandId=brandId;
    this.shopParams.pageNumber=1
    this.getProducts();
  }

  onTypeSelected(typeId:number) {
    console.log();
    this.shopParams.typeId=typeId;
    this.shopParams.pageNumber=1
    this.getProducts();
  }

  onSortSelected(sort:string) {
    this.shopParams.sort=sort;
    this.getProducts();
  }

  onPageChanged(event:any) {
    if (this.shopParams.pageNumber!==event) {
      this.shopParams.pageNumber=event;
      this.getProducts();
    }
    
  }
   
  onSearch() {
 this.shopParams.search=this.searchTerm.nativeElement.value;
 this.shopParams.pageNumber=1
 this.getProducts();
  }

  onReset(){
    this.searchTerm.nativeElement.value=undefined;
    this.shopParams=new ShopParams();
    this.getProducts();
  }
}
