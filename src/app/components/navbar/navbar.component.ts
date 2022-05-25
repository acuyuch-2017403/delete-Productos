import { Component, OnInit } from '@angular/core';
import { UserRestService } from 'src/app/services/userRest/user-rest.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  token:any;
  role: any; 
  identity:any;

  constructor(
    private userRest: UserRestService
  ) { 
  }

  ngOnInit(): void {
    this.identity = this.userRest.getIdentity().role;
    this.token = this.userRest.getToken();
  }

  


}
