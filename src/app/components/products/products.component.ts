import { Component, OnInit } from '@angular/core';
import { ProductRestService } from 'src/app/services/productRest/product-rest.service';
import { CategoryRestService } from 'src/app/services/categoryRest/category-rest.service';
import { ProductModel } from 'src/app/models/product.model';
import { UserRestService } from 'src/app/services/userRest/user-rest.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products:any;
  categorys:any;
  product: ProductModel;
  /*Actualizar paso 6*/
  productUpdate:any; 

  constructor(
    private productRest: ProductRestService,
    private categoryRest: CategoryRestService,
    private userRest: UserRestService
    
  ) { 
    this.product = new ProductModel('','','',0,0,0,'');
  }

  ngOnInit(): void {
    this.getProducts();
    this.getCategorys();
  }

  getProducts(){
    this.productRest.getProducts().subscribe({
      next: (res:any)=> this.products = res.products,
      error: (err)=>alert(err.error.message)
    })
  }

  getCategorys(){
    this.categoryRest.getCategorys().subscribe({
      next: (res:any)=> this.categorys = res.categorys,
      error: (err)=>console.log(err)
    })
  }

/*6/05/22  agregar el parametro paso 5 #addProductFrom:any-->*/ 

/*Reset solo nos va a servir para los formulario -->*/ 
  saveProduct(addProductForm:any){
    this.productRest.saveProduct(this.product).subscribe({
      next: (res:any)=> {
       alert(res.message); 
       this.getProducts();  //06-05-22 parte 1  cada vez que guarda un producto (next) haga un get producto {seteara los productos que responsa el backend}
       addProductForm.reset(); /*6/05/22  agregar el parametro paso 6 #addProductFrom-->       */                    
      },
      error: (err)=> alert(err.error.message || err.error)
    })
  }

  /* Actualizacion parte 2 */
  getProduct(id:string){
     this.productRest.getProduct(id).subscribe({
       next: (res:any)=> this.productUpdate = res.product,  /*Actualizar paso  se agrego  this.productUpdate = res.product y se quito en consolo.log*/
       error: (err)=> alert(err.error.message)
     })
  }

  /*Paso 11 de la actualizacion*/
  updateProduct(){
    this.productUpdate.sales = undefined;
    this.productRest.updateProduct(this.productUpdate._id, this.productUpdate).subscribe({
      next: (res:any)=> {
        alert(res.message);
        this.getProducts();
      },
      error: (err)=> alert(err.error.message || err.error)
    })
  }

  deleteProduct(id:string){
    this.productRest.deleteProduct(id).subscribe({
      next: (res:any)=> {
        Swal.fire({
          title: res.message + ' ' + res.productDeleted.name,
          position: 'center',
          icon: 'success',
          showConfirmButton: false,
          timer: 2000
        });
        this.getProducts();
      },
      error: (err)=> Swal.fire({
        title: err.error.message,
        position: 'center',
        icon: 'error',
        timer: 4000
      })
    })
  }

}
