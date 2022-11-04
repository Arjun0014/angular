import { Component, OnInit,Inject } from '@angular/core';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { Promotion } from '../shared/promotion';
import { PromotionService } from '../services/promotion.service';
import { Leader } from '../shared/leader';
import { LeaderService } from '../services/leader.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  dish: Dish;
  dishErrMess: string;
  promotion: Promotion;
  leader: Leader;

  constructor(
    private promotionService: PromotionService,
    private dishService: DishService,
    private leaderService: LeaderService,
    @Inject('BaseURL') public BaseURL
    ) { }

  ngOnInit(): void {
    this.dishService.getFeaturedDish()
      .subscribe({next: (dish)=>this.dish = dish,
        error: errmess => this.dishErrMess = <any>errmess});
    this.promotionService.getFeaturedDish()
      .subscribe((promotion) => this.promotion = promotion);
    this.leaderService.getFeaturedLeader()
      .subscribe((leader)=>this.leader = leader);
  }

}
