import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/admin/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-sidebar',
  templateUrl: './user-sidebar.component.html',
  styleUrls: ['./user-sidebar.component.css']
})
export class UserSidebarComponent implements OnInit {

  categories: any;

  constructor(private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.categoryService.getAllCategories().subscribe((response) => {
      this.categories = response;
    }, 
    (error) => {
      Swal.fire({
        title: 'Error!',
        text: 'Error in loading categories.',
        icon: 'error',
        confirmButtonText: 'OK'
      })
    })
  }

  clickedButton(categoryId: any) {
    console.log("categoryId: " + categoryId);
  }

}
