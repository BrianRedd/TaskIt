//import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from "@ionic/storage";
import { Observable } from "rxjs/Observable";
//import { Observer } from "rxjs/Observer";
import 'rxjs/add/observable/fromPromise';

//import { UserVO } from "../../shared/UserVO";

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

}
