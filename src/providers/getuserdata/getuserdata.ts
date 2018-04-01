//import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from "@ionic/storage";
//import { Observable } from "rxjs/Observable";
//import "rxjs/add/operator/map";

import { UserVO } from "../../shared/UserVO" ;

@Injectable()
export class GetuserdataProvider {

  users: UserVO[];

  constructor(
   // public http: HttpClient,
    private storage: Storage
  ) {
    console.log('Get User Data from Storage or Server');

    storage.get("users").then(users => {
      if (users) {
        console.log("Remembered users", users);
        this.users = users;
      } else {
        console.log("No remembered users");
        this.users = [];
      }
    })
  }

  getUsers() {
    return this.users;
  };

}
