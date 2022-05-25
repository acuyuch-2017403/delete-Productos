import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserRestService } from '../services/userRest/user-rest.service';
import { Router } from '@angular/router';

/*Me va a servir en el contructor para balidar rol cliente y admin*/

/*Guard nos ayuda para rutas solamente */

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {
/*02-05-22 Se elimino todo en el canActivate guardas 1 */  

  constructor(
    private userRest: UserRestService,
    public router: Router
  ){}

  /*02-05-22 Se elimino todo en el canActivate guardas 3*/  
  canActivate(){ // Booleano -> true/false
    if(this.userRest.getIdentity().role == 'CLIENT' ||
       this.userRest.getIdentity().role == 'ADMIN'){
      return true; 
    }else{
      this.router.navigateByUrl('/login');
      return false
    }
  }
  
}
