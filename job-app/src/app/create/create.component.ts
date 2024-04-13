import { Component, OnInit } from '@angular/core';
import { JobTracker } from '../job-tracker';
import { JobsService } from '../job.service';
import { Router } from '@angular/router';
import { AuthService } from '../authentication/authService';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  data: JobTracker;
  jobsData: any;
  showLoader: boolean = true;

  constructor(
    public jobsService: JobsService,
    public router: Router, public authService: AuthService
  ) {
    this.data = new JobTracker();
    this.jobsData = [];
  }

  ngOnInit() {
    let that = this;
    setTimeout((function(){
     that.showLoader = false}),1000)
  }

  submitForm() {
    this.jobsService.createItem(this.data).subscribe((response) => {
      this.router.navigate(['list']);
    });

  }



}
