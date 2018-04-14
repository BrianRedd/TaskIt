//import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { Observer } from "rxjs/Observer";
import { Md5 } from "ts-md5/dist/md5";

import { GetuserdataProvider } from "../getuserdata/getuserdata";
import { UserVO } from "../../shared/UserVO";
import { UserModel } from "../../models/usermodel";

@Injectable()
export class AuthenticationProvider {

  constructor(
    //public http: HttpClient,
    public userModel: UserModel,
    private getUserService: GetuserdataProvider
  ) {
    console.log('Compare UN/PW with User Data');
  }

  validateUser(username: string, password: string) {
    let o: Observable<boolean> = Observable.create(
      (observer: Observer<boolean>) => {
        this.getUserService.getTIUsers().subscribe((users) => {
          let res: boolean = false;
          if (users) {
            for (var i: number = 0; i < users.length; i++) {
              if (username === users[i].username) {
                if (Md5.hashStr(password) === users[i].password
                    || password === users[i].password
                    || Md5.hashStr(password) === Md5.hashStr(users[i].password)) {
                  res = true;
                  this.userModel.user = users[i];
                }
              }
            }
            observer.next(res);
            observer.complete();
          } else {
            console.log("Error getting users");
            return false;
          }
        });
      });
    return o;
  };


}
