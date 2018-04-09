//import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from "@ionic/storage";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/observable/fromPromise';

@Injectable()
export class GetuserdataProvider {

  constructor(
   // public http: HttpClient,
    private storage: Storage
  ) {
  }

  getTIUsers() {
    return Observable.fromPromise(this.storage.get("TIusers").then(users => {
      return users;
    }));
  };

  getCTIUser() {
    return Observable.fromPromise(this.storage.get("CTIuser").then(user => {
      return user;
    }));
  };

  setTIUsers(users) {
    return Observable.fromPromise(this.storage.set("TIusers", users).then(users => {
      return users;
    }));
  }

  setCTIUser(user) {
    return Observable.fromPromise(this.storage.set("CTIuser", user).then(user => {
      return user;
    }));
  }

  forgetCTIUser() {
    return Observable.fromPromise(this.storage.remove("CTIuser").then(user => {
      return user;
    }));
  }

}
