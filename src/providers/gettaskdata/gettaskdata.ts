//import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from "@ionic/storage";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/observable/fromPromise';

@Injectable()
export class GettaskdataProvider {

  constructor(
    //public http: HttpClient,
    private storage: Storage
  ) {
    console.log('Get Task Data from Storage or Server');
  }

  getUserTasks(user: number) {
    return Observable.fromPromise(this.storage.get("Tasks_" + user).then(tasks => {
      return tasks;
    }));
  };

  getTask(user: number, id: number) {
    return Observable.fromPromise(this.storage.get("Tasks_" + user).then(tasks => {
      return tasks[id];
    }));
  }

  setUserTasks(user: number, tasksArray: any) {
    return Observable.fromPromise(this.storage.set("Tasks_" + user, tasksArray).then(tasks => {
      return tasks;
    }));
  };

}
