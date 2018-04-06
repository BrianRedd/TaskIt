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

  sortTasks(tasks: TaskVO[], method: any) {
      let temp: TaskVO;
      for (var i: number = 0; i < tasks.length -1; i++) {
        for (var ii: number = i; ii < tasks.length; ii++ ) {
          if (tasks[ii][method] < tasks[i][method]) {
            temp = tasks[ii];
            tasks[ii] = tasks[i];
            tasks[i] = temp;
          }
        }
      }
      return tasks;
  }

  styleTasks(tasks: TaskVO[]) {
    let datetime: any = new Date();
    for (var i: number = 0; i < tasks.length; i++) {
      tasks[i].flag = "";
      tasks[i].flagcolor = "";
      tasks[i].style = "";
      if (tasks[i].priority === 0) {
        tasks[i].flag = "trending-down";
        tasks[i].flagcolor = "archive";
      } else if (tasks[i].priority === 2) {
        tasks[i].flag = "trending-up";
        tasks[i].flagcolor = "primary";
        tasks[i].style += " bold";
      }
      if (tasks[i].recurring) {
        tasks[i].style += " italic";
      }
      if (tasks[i].completed) {
        tasks[i].style += " completed";
      }
      if (this.dateService.stringToDate(tasks[i].dateScheduled) < datetime) {
        if (!tasks[i].flag) {
          tasks[i].flag = "warning";
        }
        tasks[i].flagcolor = "red";
        tasks[i].style += " overdue";
      }
    }
    return tasks;
  }

  filterTasks(tasks: TaskVO[], parameter: any, value: any) {
    let res: TaskVO[] = [];
    for (var i: number = 0; i < tasks.length; i++) {
      if (tasks[i][parameter] === value) {
        res.push(tasks[i]);
      }
    }
    return res;
  }
}
