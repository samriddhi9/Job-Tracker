import { Component, OnInit } from '@angular/core';
import { JobTracker } from '../job-tracker';
import { JobsService } from '../job.service';
import { AuthService } from '../authentication/authService';

declare const $: any;
@Component({
  selector: 'app-job-data',
  templateUrl: './job-data.component.html',
  providers: [ JobsService ],
  styleUrls: ['./job-data.component.css']
})
export class JobDataComponent implements OnInit {
  showLoader: boolean = true;
  jobsData: any;
  pageLoader: boolean = false;
  selectedItem: any;
  constructor(
    public jobsService: JobsService, public authService: AuthService
  ) {
    this.jobsData = [];
  }

  ngOnInit() {
    let that = this;
    setTimeout((function(){
     that.showLoader = false}),1000)
    this.getAllJobs();

  }

  getAllJobs() {
    this.jobsService.getList().subscribe(response => {
      console.log(response);
      this.jobsData = response;
      this.pageLoader= false;
    })
  }

  checkStatus(item:any){
    let email = this.authService.email
    this.jobsService.searchEmail(email,item.companyName).subscribe(
      response => {
        let res = response.messages;
      },
      error => {
        console.error('Error searching emails:', error);
      }
    );
  }

  delete(item) {
    this.pageLoader= true;
    this.jobsService.deleteItem(item.id).subscribe(Response => {    
      this.getAllJobs();
    }
    );
    
  }
  

}

