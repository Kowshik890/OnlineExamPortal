import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/admin/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-category',
  templateUrl: './view-category.component.html',
  styleUrls: ['./view-category.component.css']
})
export class ViewCategoryComponent implements OnInit {

  categories: any[] = [];

  constructor(private categoryService: CategoryService) { }
 
  ngOnInit(): void {
    this.getAllCategories();
  }

  getAllCategories(): void {
    this.categoryService.getAllCategories().subscribe((response: any) => {
      this.categories = response;
    },
    (error)=> {
      Swal.fire({
        title: 'Error!',
        text: 'Error in loading data.',
        icon: 'error',
        confirmButtonText: 'OK'
      })
    })
  }

  deleteCategory(id: any) {
    this.categoryService.deleteCategoryById(id).subscribe((response: any) => {
      console.log(response);
      
      Swal.fire({
        title: 'Success!!',
        text: 'Category has been deleted successfully...',
        icon: 'success',
        confirmButtonText: 'OK'
      })
      this.getAllCategories();
    },(error)=> {
      Swal.fire({
        title: 'Error!',
        text: 'Error in deleting category.',
        icon: 'error',
        confirmButtonText: 'OK'
      })
    })
  }
}
