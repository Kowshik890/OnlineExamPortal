import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CategoryDTO } from 'src/app/datatransferobject/category-dto';
import { CategoryService } from 'src/app/services/admin/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {

  addCategoryForm!: FormGroup;

  constructor(private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.addCategoryForm = new FormGroup({
      title: new FormControl(''),
      description: new FormControl('')
    })
  }

  addCategory() {
    const categoryDTO: CategoryDTO = {
      title: this.addCategoryForm.get('title')?.value,
      description: this.addCategoryForm.get('description')?.value
    }

    // add request to the server
    this.categoryService.addCategory(categoryDTO).subscribe((response:any) => {
      this.addCategoryForm.reset();
      Swal.fire({
        title: 'Success!!',
        text: 'Category is added successfully...',
        icon: 'success',
        confirmButtonText: 'OK'
      })
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
