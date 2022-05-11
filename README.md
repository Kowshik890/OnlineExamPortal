# Online Exam Portal

## This Online Exam Portal project is developing using Spring Boot, Angular and MySQL.

## Project Functionalities
* User Registration with validation

N.B: under development...

## Frontend
* Angular Material
  * ng add @angular/material
* Bootstrap Grid CSS Only
  * npm install bootstrap-grid-only-css --save
  * add following code in 'angular.json'
      ```
          "styles": [
            "./node_modules/bootstrap-grid-only-css/dist/css/bootstrap-grid.min.css"
          ]
      ```
* Angular Sweetalert  
  * npm install sweetalert2 
  * import Swal from 'sweetalert2' in each components
    ```
      Swal.fire({
         title: 'Success!',
         text: 'User registered successfully.',
         icon: 'success',
         confirmButtonText: 'OK'
      })
    ```

## Backend
* Add CORS Mapping to avoid "No 'Access-Control-Allow-Origin' header is present"



## Diagrams (Database)
* Class Diagram Between USER and ROLE

     [![ERD-1-User-Role-Relation.png](https://i.postimg.cc/7YYRQfH0/ERD-1-User-Role-Relation.png)](https://postimg.cc/qgSQNBCv)
