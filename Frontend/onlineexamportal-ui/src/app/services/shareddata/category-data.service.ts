import { Injectable } from '@angular/core';
import { CategoryDTO } from 'src/app/datatransferobject/category-dto';

@Injectable({
  providedIn: 'root'
})
export class CategoryDataService {

  categoryDTO: CategoryDTO | undefined;

  constructor() { }

  setCategory(categoryDTO: CategoryDTO) {
    this.categoryDTO = categoryDTO;
  }

  getCategory() {
    return this.categoryDTO;
  }
}
