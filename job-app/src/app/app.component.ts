import { Component } from '@angular/core';
import { AuthService } from './authentication/authService';
import { Router } from '@angular/router';
declare const $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  constructor(private authService : AuthService ,private router: Router ) {
    // $(document).ready(function(){
    //   var myVar = setTimeout(showPage, 3000);
     
    // })
    // function showPage() {
    //   document.getElementById("loader").style.display = "none";
    //   document.getElementById("myDiv").style.display = "block";
    // }
  
  }


}
