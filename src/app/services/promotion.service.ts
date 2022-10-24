import { Injectable } from '@angular/core';
import { Promotion } from '../shared/promotion';
import { PROMOTIONS } from '../shared/promotions';
@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  constructor() { }

  
  getDishes(): Promise<Promotion[]>{
    return new Promise(resolve => {
      setTimeout(() => resolve(PROMOTIONS),3000); 
  })
}

  getDish(id: string): Promise<Promotion> {
    return new Promise(resolve => {
      setTimeout(() => resolve(PROMOTIONS.filter((promo) => (promo.id === id))[0]),3000);
  })
}

  getFeaturedDish(): Promise<Promotion> {
    return new Promise(resolve => {
      setTimeout(() => resolve(PROMOTIONS.filter((promo) => promo.featured)[0]),3000);
  })
}
}
