import { Component, OnInit, ViewChild } from '@angular/core';
import { JobTracker } from '../job-tracker';
import { JobsService } from '../job.service';
import { Router,ActivatedRoute } from '@angular/router';
import { JobDataComponent  } from "../job-data/job-data.component";
import { AuthService } from '../authentication/authService';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  id: number;
  data: JobTracker;
  showLoader: boolean = true;
  // @ViewChild(JobTrackerDataComponent) idfromdatapage;

  constructor(
    public activatedRoute: ActivatedRoute,
    public router: Router, public authService: AuthService,
    public jobsService: JobsService
  ) {
    this.data = new JobTracker();  
  
  }

  ngOnInit() {
    let that = this;
    setTimeout((function(){
     that.showLoader = false}),1000)
    this.id = this.activatedRoute.snapshot.params["id"];
    this.jobsService.getItem(this.id).subscribe(response => {
      console.log(response);
      this.data = response;
    })

  }

  update() {
    this.jobsService.updateItem(this.id, this.data).subscribe(response => {
      this.router.navigate(['list']);
    })
  }


}
