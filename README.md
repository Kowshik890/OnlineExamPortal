# Online Exam Portal

## This Online Exam Portal project is developing using Spring Boot, Angular, MySQL, JWT Authentication using Spring Security and AWS EC2.

## Project Functionalities
* User Registration with validation
* User Login with JWT Token Authentication
* Redirect to respective user dashboard
* Show User Profile details 
* Admin can add, view, delete and update category
* Admin can add, view, delete and update quiz
* Admin can add, view, delete and update Question
* Normal user can view all active quizzes
* Normal user can also view categorized quizzes
* Once exam starts, user can't go back
* User can start the quiz and submit after finishing the quiz
* Set Timer using Progress Spinner to count down the time 
  * If user can't finish the quiz within time, then the quiz will be automatically submitted
* User can see the result sheet after submiting the quiz

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
* CKEditor as Rich Text Editor
  * npm install --save @ckeditor/ckeditor5-angular
  * npm install --save @ckeditor/ckeditor5-build-classic
  * For details: https://ckeditor.com/docs/ckeditor5/latest/installation/getting-started/frameworks/angular.html

* Prevent Back Button (Going back to other URLs)
   ```
      constructor(private locationStrategy: LocationStrategy) { }
      
      preventBackButton() {
          history.pushState(null, "", location.href);
          this.locationStrategy.onPopState(() => {
          history.pushState(null, "", location.href);
       })
     }
   ```
   
* Use "Progress Spinner" to count the time
   ```
      let time = window.setInterval(() => {
      if (this.timer <= 0) {
        this.evalQuiz();
        clearInterval(time);
      } else {
        this.timer--;
      }
      }, 1000)
   ```

 * Use Loader (ngx-ui-loader) in whole App in 3 steps
    * npm i ngx-ui-loader
    * add "import { NgxUiLoaderModule } from "ngx-ui-loader";" in app.module.ts file
    * add "NgxUiLoaderModule" in imports array
    * add "NgxUiLoaderHttpModule" in imports array to load for each and every HTTP Request
    * to show the loader in the center of the web page
       ```
          NgxUiLoaderHttpModule.forRoot({
             showForeground: true
          })
       ```
    * Documentation Link: https://tdev.app/ngx-ui-loader

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
   
   
* Adding "@Transient" in Question Model for givenAnswer attribute
   * @Transient is used to not to store data in DB of that attribute
   ```
      @Transient
      private String givenAnswer;
   ```

