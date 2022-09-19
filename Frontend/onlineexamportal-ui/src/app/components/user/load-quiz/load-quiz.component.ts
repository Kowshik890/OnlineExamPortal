import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoryDataService } from 'src/app/services/shareddata/category-data.service';

@Component({
  selector: 'app-load-quiz',
  templateUrl: './load-quiz.component.html',
  styleUrls: ['./load-quiz.component.css']
})
export class LoadQuizComponent implements OnInit {

  categoryId: any;

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.categoryId = params['id'];
      if(this.categoryId == 0) {
        console.log("category Id if " + this.categoryId);
      }
      else {
        console.log("category Id else " + this.categoryId);
      }
    })
    
  }

}
