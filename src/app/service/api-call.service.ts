import { Injectable } from '@angular/core';
import {HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiCallService {

  constructor(private http: HttpClient) {}

  allResult: any;
  baseurl: string = 'https://hacker-news.firebaseio.com/v0/item/'
   getLatestJobList(): Observable<any>{
    return this.http.get('https://hacker-news.firebaseio.com/v0/jobstories.json')
  }
  getJobDetailsById(id: number): Observable<any>{
    return this.http.get(`${this.baseurl}${id}.json`)
  }
  getJobDetails(ids:number[]): Observable<any>{
    let jobDetails =[]
    jobDetails = ids.map((element:any)=>{
      return this.getJobDetailsById(element)
    })
    return forkJoin(jobDetails)
  }
}
