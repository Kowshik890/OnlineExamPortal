import { Component, OnInit } from '@angular/core';
import { CategoryDTO } from 'src/app/datatransferobject/category-dto';
import { CategoryService } from 'src/app/services/admin/category.service';
import { CategoryDataService } from 'src/app/services/shareddata/category-data.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-category',
  templateUrl: './view-category.component.html',
  styleUrls: ['./view-category.component.css']
})
export class ViewCategoryComponent implements OnInit {

  categories: any[] = [];
  categoryDTO: CategoryDTO | undefined;

  constructor(private categoryService: CategoryService, private sharedCategoryData: CategoryDataService) { }
 
  ngOnInit(): void {
    this.getAllCategoriesOrderByIdDesc();
  }

  getAllCategoriesOrderByIdDesc(): void {
    this.categoryService.getAllCategoriesOrderByIdDesc().subscribe((response: any) => {
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

  deleteCategory(id: any, title: any) {
    Swal.fire({
      title: title,
      text: "Are you sure to delete this category?",
      icon: "warning",
      confirmButtonText: "Delete",
      showCancelButton: true
    }).then((response) => {
      if(response.isConfirmed) {
        this.categoryService.deleteCategoryById(id).subscribe((response: any) => {      
          Swal.fire({
            title: 'Success!!',
            text: 'Category has been deleted successfully...',
            icon: 'success',
            confirmButtonText: 'OK'
          })
          this.getAllCategoriesOrderByIdDesc();
        },(error)=> {
          Swal.fire({
            title: 'Error!',
            text: 'Error in deleting category.',
            icon: 'error',
            confirmButtonText: 'OK'
          })
        })
      }
    })
  }

  editButtonClicked(category: CategoryDTO) {
    this.categoryDTO = category;
    this.sharedCategoryData.setCategory(this.categoryDTO);
  }
}
