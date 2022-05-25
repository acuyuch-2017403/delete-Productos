import { Component, OnInit } from '@angular/core';
import { UserModel } from 'src/app/models/user.model';
import { UserRestService } from 'src/app/services/userRest/user-rest.service'; //1 
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  /*paso3*/
  user: UserModel; 

  constructor(
    //2 Con eso ya puedo utilizar los metodos que trae el servicio linea 1,2
    private userRest: UserRestService,
    private router: Router 
  ) 
  {
    this.user = new UserModel('','','','','','','','');
  }

  ngOnInit(): void {
  }

/*-----------------------------------------------------------------------------------------------------
  /*susbcribe que nos ayuda a mapear las solicitud http*/
  /*Con este metodo podemos capturar la respuesta y moldear la respuesta (susbripe observable)*/
  /*Estamos consumiento nuestro api*/

  //Metodo de prueba
  /*
   register(){
    this.userRest.prueba().subscribe((res:any)=>{
      alert(res.message);
   })
  
  //console.log(this.user);
  /*------------------------------------------------------------------------------------------------------ */
  /*Manejos de errores*/
   register(registerForm:any){
     this.userRest.register(this.user).subscribe({
      next: (responsive:any)=>{   // si entra al next se creo el usuario
        alert(responsive.message);
        return this.router.navigateByUrl('/login');
      },
      error: (err)=> {
        registerForm.reset();
        return alert(err.error.message || err.error); // Si entra a este apartado no se creo 
      }
     })
   }
  }



   
