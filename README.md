# Online Exam Portal

## This Online Exam Portal project is developing using Spring Boot, Angular and MySQL.

## Project Functionalities
* User Registration with validation
* User Login with JWT Token Authentication
* Redirect to respective user dashboard
* Show User Profile details 
* Admin can add, view, delete and update category

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
  * Add "Angular Guard" to secure routing for respective user
    * ng g guard <Name (Admin/User/...)>
  * Add Angular Subject event to notify respective user
  * Use Sweetalert popup to show warning while deleting any specific record.
    ```
      Swal.fire({
        title: title,
        text: "Are you sure to delete this quiz?",
        icon: "warning",
        confirmButtonText: "Delete",
        showCancelButton: true
       }).then((response) => {
        if(response.isConfirmed) {
          ========================
          ========================
        }
       })
    ```

## Backend
* Add CORS Mapping to avoid "No 'Access-Control-Allow-Origin' header is present"
* Add 'Spring Security, io.jsonwebtoken (jjwt), javax.xml.bind (jaxb-api)' dependencies for JWT Authentication
* Create JWT Token request and response classes
* JWT Authentication workflow

  [![a.jpg](https://i.postimg.cc/cJzJncMS/a.jpg)](https://postimg.cc/mcQRxC5X)


## Diagrams (Database)

* ER Diagram Between USER and ROLE

   [![ERD1-User-Role.png](https://i.postimg.cc/g0YNGXM8/ERD1-User-Role.png)](https://postimg.cc/5XRw30W2)

* Class Diagram Between USER and ROLE

   [![ERD-1-User-Role-Relation.png](https://i.postimg.cc/7YYRQfH0/ERD-1-User-Role-Relation.png)](https://postimg.cc/qgSQNBCv)
     
     
* ER Diagram Between Category, Quiz and Question

   [![ERD2-Category-Quiz-Question.png](https://i.postimg.cc/XqXP4GYQ/ERD2-Category-Quiz-Question.png)](https://postimg.cc/jn0chjN7)

* Class Diagram Between Category, Quiz and Question

   [![CD2-Category-Quiz-Question.png](https://i.postimg.cc/mZ6qVwmq/CD2-Category-Quiz-Question.png)](https://postimg.cc/mhC8gQfN)
