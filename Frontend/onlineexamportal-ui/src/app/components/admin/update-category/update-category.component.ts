import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CategoryDTO } from 'src/app/datatransferobject/category-dto';
import { CategoryService } from 'src/app/services/admin/category.service';
import { CategoryDataService } from 'src/app/services/shareddata/category-data.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-category',
  templateUrl: './update-category.component.html',
  styleUrls: ['./update-category.component.css']
})
export class UpdateCategoryComponent implements OnInit {

  updateCategoryForm!: FormGroup;
  categoryDTO: any;
  
  constructor(private categoryService: CategoryService, private sharedCategoryData: CategoryDataService, private router: Router) { }

  ngOnInit(): void {
    this.categoryDTO = this.sharedCategoryData.getCategory();
    this.updateCategoryForm = new FormGroup({
      title: new FormControl(this.categoryDTO?.title),
      description: new FormControl(this.categoryDTO?.description)
    })

    
  }

  updateCategory() {

    const updateCategoryDTO: CategoryDTO = {
      title: this.updateCategoryForm.get('title')?.value,
      description: this.updateCategoryForm.get('description')?.value
    }

    // update request to the server
    this.categoryService.updateCategoryById(this.categoryDTO?.id, updateCategoryDTO) .subscribe((response:any) => {
      this.updateCategoryForm.reset();
      Swal.fire({
        title: 'Success!!',
        text: 'Category is updated successfully...',
        icon: 'success',
        confirmButtonText: 'OK'
      })
      this.router.navigateByUrl("/admin/view-categories");
    },
    (error)=> {
      Swal.fire({
        title: 'Error!',
        text: 'Server error. Try again later...',
        icon: 'error',
        confirmButtonText: 'OK'
      })
    })
  }

}
