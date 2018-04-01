import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from "@ionic/storage";

@Injectable()
export class GettaskdataProvider {

  constructor(public http: HttpClient) {
    console.log('Get Task Data from Storage or Server');
  }

}
