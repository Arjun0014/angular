import { Component, OnInit, ViewChild, Inject} from '@angular/core';
import { DishService } from '../services/dish.service';
import { Dish } from '../shared/dish';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { switchMap } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { Comment } from '../shared/comments';


@Component({
  selector: 'app-dish-detail',
  templateUrl: './dish-detail.component.html',
  styleUrls: ['./dish-detail.component.scss']
})
export class DishDetailComponent implements OnInit {

  @ViewChild('cform') commentsFormDirective: NgForm;

  commentForm: FormGroup;
  comment: Comment;

  formErrors = {
    'author': '',
    'comment': ''
  }

  validationMessages = {
    'author': {
      'required':      'Did you forget your name?',
      'minlength':     'I pity the fool who named you'
    },
    'comment': {
      'required':      'Comments mukyam bigile',
      'minlength':     'Dude...you have to write something'
    }
  }


 dish: Dish;
 dishIds: string[];
 next: string;
 prev: string;
 errMess: string;
 dishCopy: Dish;

  constructor(
    private dishService: DishService,
    private route: ActivatedRoute,
    private location: Location,
    private fb: FormBuilder,
    @Inject('BaseURL') public BaseURL) {
      
     }

  ngOnInit(): void {
    this.createForm();
    this.dishService.getDishIds() 
      .subscribe((dishIds) => this.dishIds = dishIds);
    this.route.params
      .pipe(switchMap( (params: Params) => this.dishService.getDish(params['id'])))
      .subscribe({next: (dish) => { this.dish = dish; this.dishCopy = dish; this.setPrevNext(dish.id);  },
        error: errmess => this.errMess = <any>errmess})
  }

  setPrevNext(dishId: string){
    const index = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length];
    this.next = this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length];
  }

  goBack():void{
    this.location.back();
  }

  createForm(){
    this.commentForm = this.fb.group({
      author: ['',[Validators.required, Validators.minLength(2)]],
      rating: 5,
      comment: ['',[Validators.required, Validators.minLength(2)]]
    })

    this.commentForm.valueChanges
    .subscribe(data => this.onValueChanged(data));

    this.onValueChanged();
  }

  onSubmit(){
    this.comment = this.commentForm.value;
    //this.comment.date = new Date().toISOString;
    this.dishCopy.comments.push(this.comment);
    this.dishService.putDish(this.dishCopy)
      .subscribe({
        next: dish => {
        this.dish=  dish;
        this.dishCopy =dish;} ,
        error: errmess => {
          this.dish = <any>null;
          this.dishCopy = <any>null;
          this.errMess = <any>errmess;          
        }})
    this.commentsFormDirective.resetForm();
    this.commentForm.reset({
      author: '',
      rating: 5,
      comment: ''
    });

    this.commentsFormDirective.resetForm();
  }

  onValueChanged(data?: any){

    if(!this.commentForm) {return ;}

    const form = this.commentForm;
    for(const field in this.formErrors){
      if(this.formErrors.hasOwnProperty(field)){
        (this.formErrors as any)[field] = ''; //clear any previous error messages
        const control = form.get(field);
        if(control && control.dirty && !control.valid){
          const messages = (this.validationMessages as any)[field];
          for(const key in control.errors ){
            if(control.errors.hasOwnProperty(key)){
              (this.formErrors as any)[field] += messages[key] + ' ';
            }
          }
        }
      }
    }

}
}
