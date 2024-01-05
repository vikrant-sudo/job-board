import { Component, OnInit } from '@angular/core';
import { ApiCallService } from '../service/api-call.service';
import { observable } from 'rxjs';

@Component({
  selector: 'app-job-board',
  templateUrl: './job-board.component.html',
  styleUrls: ['./job-board.component.css']
})
export class JobBoardComponent implements OnInit {

  allJobsId = []
  allJobDetails: any
  totalRound: number=0
  currentCount: number=1

  constructor(private apiCall: ApiCallService) { }

  ngOnInit(): void {
    this.apiCall.getLatestJobList().subscribe(result=>{
      this.allJobsId=result
      this.totalRound=Math.ceil(this.allJobsId.length/6)
      console.log(this.allJobsId, this.allJobsId.slice(50))
      this.allJobDetails=this.apiCall.getJobDetails(this.allJobsId.slice(50))
    })
  }

  loadMoreJob(){
    console.log('this.totalRound ', this.totalRound, 'this.currentCount ', this.currentCount)
    this.allJobDetails=this.apiCall.getJobDetails(this.allJobsId.slice((this.currentCount-1)*6, (this.currentCount)*6))
    this.currentCount=this.currentCount+1
  }

}
