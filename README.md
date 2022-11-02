# Online Exam Portal

## This Online Exam Portal project is developing using Spring Boot, Angular, MySQL, and JWT Authentication using Spring Security. In addition, deploying the project to AWS EC2.

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

## Deployment into AWS EC2
* Select EC2 and choose an Instance type
  * For this project Ubuntu is selected (Free tier eligible)
* After creating an Operating system, connect it after clicking the Intance ID and open the terminal in browser
  [![Screenshot-2022-11-01-at-18-32-57.png](https://i.postimg.cc/6pn8fv2r/Screenshot-2022-11-01-at-18-32-57.png)](https://postimg.cc/0z558rCj)
* By using command, ubuntu (which is inside the virtual private server) can be accessed
* Install Java (Java version 17 is used for the project)
  * sudo apt install openjdk-17-jre-headless
* Install JDK
  * sudo apt install openjdk-17-jdk-headless
* To update the list, write this in the terminal
  * sudo apt update
* Install MySQL Server
  * sudo apt install mysql-server
  * sudo mysql (to write command after installation)
* To use DB from local machine, new user is created
  * create user 'examuser'@'%' identified by 'password';
  * grant all privileges on *.* to 'examuser'@'%' with grant option;
  * flush privileges;
  * exit
  * mysql -u examuser -p
    * Enter password:
  * To use this "examuser" user from local machine
    * go to instance
    * select security and click on security group
    * click edit inbound rules
    
      [![Screenshot-2022-11-01-at-20-26-52.png](https://i.postimg.cc/SQ9XbKp1/Screenshot-2022-11-01-at-20-26-52.png)](https://postimg.cc/Z0TYr4n6)
    * to connect, open workbench
    * go to EC2 Dashboard, select "Elastic IT Addresses"
    
      [![Screenshot-2022-11-01-at-20-36-00.png](https://i.postimg.cc/d0n2dV0j/Screenshot-2022-11-01-at-20-36-00.png)](https://postimg.cc/7CGJrD05)
    * go to "Actions" and select "Associate Elastic IP address"
    
      [![Screenshot-2022-11-01-at-20-38-55.png](https://i.postimg.cc/wTcQH2dr/Screenshot-2022-11-01-at-20-38-55.png)](https://postimg.cc/XpqCkwqK)
    * go to instance and copy the "Public IPv4 address" and paste that on workbench "SSH Hostname"
    
      [![Screenshot-2022-11-01-at-20-51-42.png](https://i.postimg.cc/kgC6MPyN/Screenshot-2022-11-01-at-20-51-42.png)](https://postimg.cc/SJZNV53j)
    * SSH Password will be "AWS Login" password, "MySQL Server Port Password" will be that password which was provided while creating the user
    * open workbench and click newly created MySQL Connections "learn-aws"
    * go to ubuntu terminal and go to mysql by providing the username and password (e.g., mysql -u examuser -p)
    * create database examportal;
    * show databases; (for checking in both terminal and workbench) 
 * Creating JAR file of Spring Boot Application
   * Update application.properties file with port number, database name, username and password used in creating new user
   * To create JAR file
     * Go to Maven and select Lifecycle and double click on install
      



* going on...

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

