import { Injectable } from '@angular/core';
import { Promotion } from '../shared/promotion';
import { PROMOTIONS } from '../shared/promotions';
import { Observable, of, lastValueFrom } from 'rxjs';
import { delay } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  constructor() { }

  
  getDishes(): Observable<Promotion[]>{
    return of(PROMOTIONS).pipe(delay(2000));
     
}
// below converting observables to promises using lastvaluefrom instaed of toPromise() which is depricated
//   getDish(id: string): Promise<Promotion> {
//     return lastValueFrom(of(PROMOTIONS.filter((promo) => (promo.id === id))[0]).pipe(delay(2000)));
    
// }

getDish(id: string): Observable<Promotion> {
  return of(PROMOTIONS.filter((promo) => (promo.id === id))[0]).pipe(delay(2000));
  
}

  getFeaturedDish(): Observable<Promotion> {
    return of(PROMOTIONS.filter((promo) => promo.featured)[0]).pipe(delay(2000));
}
}
