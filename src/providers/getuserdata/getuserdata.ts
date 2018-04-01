//import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from "@ionic/storage";
//import { Observable } from "rxjs/Observable";
//import "rxjs/add/operator/map";

import { UserVO } from "../../shared/UserVO" ;

@Injectable()
export class GetuserdataProvider {

  constructor(
   // public http: HttpClient,
    private storage: Storage
  ) {
  }

  getTIUsers() {
    this.storage.get("TIusers").then((users) => {
      return users;
    });
  };

  getCTIUser() {

  }

}
