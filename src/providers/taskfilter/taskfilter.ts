//import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";

import { DateconverterProvider } from "../../providers/dateconverter/dateconverter";
import { TaskVO } from "../../shared/TaskVO";

@Injectable()
export class TaskfilterProvider {

  constructor(
    //public http: HttpClient,
    private dateService: DateconverterProvider
  ) {
    console.log('Filter Tasks via TaskfilterProvider Provider');
  }

  sortTasks(tasks: TaskVO[], method: any, order: string) {
    if (!order || (order != "asc" && order != "desc")) {
      order = "asc";
    }
    let temp: TaskVO;
    for (var i: number = 0; i < tasks.length; i++) {
      for (var ii: number = i; ii < tasks.length; ii++ ) {
        if (order === "asc") {
          if (tasks[ii][method] < tasks[i][method]) {
            temp = tasks[ii];
            tasks[ii] = tasks[i];
            tasks[i] = temp;
          }
        } else {
          if (tasks[ii][method] > tasks[i][method]) {
            temp = tasks[ii];
            tasks[ii] = tasks[i];
            tasks[i] = temp;
          }
        }
      }
    }
    return tasks;
  }

  styleTasks(tasks: TaskVO[]) {
    let newDate: any = new Date(); 
    let date = this.dateService.dateToString(newDate);
    for (var i: number = 0; i < tasks.length; i++) {
      tasks[i].flag = "";
      tasks[i].flagcolor = "";
      tasks[i].style = "";
      //console.log("taskfilter > styleTasks: [" + i + "] dateSchedule", tasks[i].dateScheduled);
      if (tasks[i].dateScheduled === date) {
        tasks[i].flag = "warning";
        tasks[i].style += " due";
      } else if (tasks[i].dateScheduled < date) {
        tasks[i].flag = "warning";
        tasks[i].style += " overdue";
      }
      if (tasks[i].priority === 0) {
        tasks[i].flag = "trending-down";
      } else if (tasks[i].priority === 2) {
        tasks[i].flag = "trending-up";
        tasks[i].style += " bold";
      }
      if (tasks[i].recurring) {
        tasks[i].style += " italic";
      }
      if (tasks[i].completed) {
        tasks[i].style += " completed";
      }
    }
    return tasks;
  }

  filterTasks(tasks: TaskVO[], parameter: any, value: any) {
    //use value="-1" for false
    let res: TaskVO[] = [];
    for (var i: number = 0; i < tasks.length; i++) {
      if (value === "-1") {
        if (!tasks[i][parameter]) {
          res.push(tasks[i])
        }        
      } else {
        if (tasks[i][parameter] === value) {
          res.push(tasks[i]);
        }
      }
    }
    return res;
  }
}
