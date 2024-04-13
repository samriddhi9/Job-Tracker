import { Component, OnInit } from '@angular/core';
import { JobTracker } from '../job-tracker';
import { JobsService } from '../job.service';
import { AuthService } from '../authentication/authService';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx/xlsx.mjs';

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

  downloadFile(): void
  {
    // /* pass here the table id */
    // let element = document.getElementById('excel-table');
    // const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);
    // delete (ws['08'])
    // ws['!cols'][8] = { hidden: true };
    // ws['!cols'][9] = { hidden: true };
    // ws['!cols'][10] = { hidden: true };
    // /* generate workbook and add the worksheet */
    // const wb: XLSX.WorkBook = XLSX.utils.book_new();
    // XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    // /* save to file */  
    // XLSX.writeFile(wb, 'Sheet.xlsx');

    const fileName = "sheet.xlsx";
    //let arr = this.jobsData.map((item)=>)
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.jobsData);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "sheet");

    XLSX.writeFile(wb, fileName);

  }

}

