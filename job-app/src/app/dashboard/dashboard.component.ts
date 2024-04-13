import { Component, OnInit } from '@angular/core';
import { JobsService } from '../job.service';
import { AuthService } from '../authentication/authService';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  email: any;
  keyword:any
  isLoggedin: boolean = false;
  showLoader: boolean = true;
  constructor(private jobsService: JobsService, private authService: AuthService) { }

  ngOnInit() {
     let that = this;
     setTimeout((function(){
      that.showLoader = false}),1000)
  }

  searchEmails() {
  
  }
}
