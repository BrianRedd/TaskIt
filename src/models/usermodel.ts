import { Injectable } from '@angular/core';
import { UserVO } from "../shared/UserVO";

@Injectable()

export class UserModel {

    user: UserVO;

    validateUser() {
        if (!this.user) {
            return false;
        }
        return true;
    }

    logoutUser() {
        console.log("User logging out", this.user);
        this.user = null;
    }
};