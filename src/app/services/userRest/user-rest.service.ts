import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from  '@angular/common/http'; 
import { environment } from 'src/environments/environment'; 

@Injectable({
  providedIn: 'root'
})
export class UserRestService {
  //1.Le estamos diciendo que vamos a utilizar formato Jso (nos ayuda en la parte de POSTMA)
  httpOptions = new HttpHeaders().set('Content-Type', 'application/json');

  //2.Estoy creando un servicio de cliente http para poder ir a consumir mi backend  (api http)
  constructor(private http: HttpClient) {}
  

  // Con esto tengo configurado mi servicio
  prueba(){               // Conexion           // MetodoBack     // Consumir mi backend
    return this.http.get(environment.baseUrl + 'user/pruebaUser', {headers: this.httpOptions});
  }
   /*Estamos identificando que estamos usuando un objeto */
  register(params:{}){
    return this.http.post(environment.baseUrl + 'user/register', params , {headers: this.httpOptions});
  }

  login(params:{}){
    return this.http.post(environment.baseUrl + 'user/login', params, {headers: this.httpOptions});
  }

  getToken(){
    let globaltoken = localStorage.getItem('token');
    let token;
    if(globaltoken != undefined){
      token = globaltoken; 
    }else{
      token = ''
    }
    return token;
  }

  /*02-05-22 Se elimino todo en el canActivate guardas 2 */  
  getIdentity(){
    let globalIdentity = localStorage.getItem('identity');
    let identity; 
    if(globalIdentity != undefined){
      identity = globalIdentity;
    }else{
      identity = '';
    }
    return JSON.parse(identity); 
  }
}
