//import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { Observer } from "rxjs/Observer";

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
              //console.log("Compare TIUser" + i + "; does " + username + " match " + users[i].username);
              if (username === users[i].username) {
                //console.log("Username match:", username);
                if (password === users[i].password) {
                  //console.log("Passwords match! Hazzah!");
                  res = true;
                  this.userModel.user = users[i];
                  //console.log("AuthService: this.userModel.user", this.userModel.user);
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
      //console.log("o", o);
    return o;
  };


}
