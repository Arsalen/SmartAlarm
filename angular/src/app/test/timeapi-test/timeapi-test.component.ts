import { Component, OnInit } from '@angular/core';
import {TestServiceTimeService} from '../test-service-time.service';


class Time{
  time:string;
  milliseconds_since_epoch:number;
  date:string;
}


@Component({
  selector: 'app-timeapi-test',
  templateUrl: './timeapi-test.component.html',
  styleUrls: ['./timeapi-test.component.css'],
  providers:[TestServiceTimeService]
})
export class TimeapiTestComponent implements OnInit {


  private time :Time;
  private errorMessage;
  constructor(private testService : TestServiceTimeService) { }

  ngOnInit() {
    
  }

  
show_time(){
  console.log(this.time.time);
}

  update_time(){
     this.testService.getTime()
    .subscribe( time => {this.time = time;console.log('in heeeere')},
    error => this.errorMessage = <any>error ); 
  }
}
