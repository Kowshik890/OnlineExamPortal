import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CategoryDTO } from 'src/app/datatransferobject/category-dto';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private baseURL = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  getAllCategoriesOrderByIdDesc() {
    return this.http.get(`${this.baseURL}/api/category/all/desc`);
  }

  getAllCategories() {
    return this.http.get(`${this.baseURL}/api/category/all/asc`);
  }

  addCategory(addCategoryMetaData: CategoryDTO): Observable<CategoryDTO> {
    return this.http.post<CategoryDTO>(`${this.baseURL}/api/category/add`, addCategoryMetaData);
  }

  deleteCategoryById(categoryId: any) {
    return this.http.delete(`${this.baseURL}/api/category/${categoryId}`);
  }

  updateCategoryById(categoryId: any, updateCategoryMetaData: CategoryDTO): Observable<CategoryDTO> {
    return this.http.put<CategoryDTO>(`${this.baseURL}/api/category/${categoryId}`, updateCategoryMetaData);
  }
}
