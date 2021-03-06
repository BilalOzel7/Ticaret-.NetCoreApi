import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AccountService } from 'src/app/account/account.service';
import { BasketService } from 'src/app/basket/basket.service';
import { IBasket } from 'src/app/shared/models/basket';
import { IUser } from 'src/app/shared/models/users';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css']
})
export class NaviComponent implements OnInit {

  basket$:Observable<IBasket>;
  currentUser$:Observable<IUser>;
  constructor(private basketService:BasketService,private accountService:AccountService) { }

  ngOnInit(): void {
    this.basket$=this.basketService.basket$;
    this.currentUser$=this.accountService.currentUser$
  }

  logout(){
    this.accountService.logout();
  }

}
