//import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class DateconverterProvider {

  constructor(
    //public http: HttpClient
  ) {
    console.log('Hello DateconverterProvider Provider');
  }

  //standard date string format: YYYY-MM-DD

  dateToString(date: any) {
    let newdate: any = new Date(date);
    let yyyy: any = newdate.getFullYear();
    yyyy = yyyy.toString();
    let mm: any = newdate.getMonth() + 1;
    if (mm < 10) {
      mm = "0" + mm.toString();
    } else {
      mm = mm.toString();
    }
    let dd: any = newdate.getDate();
    if (dd < 10) {
      dd = "0" + dd.toString();
    } else {
      dd = dd.toString();
    }
    return yyyy + "-" + mm + "-" + dd;
  };

  nextRecurring(str: string) {
    let now = new Date();
    let newyear = now.getFullYear().toString();
    let part: any = str.split("-");
    let yyyy: string = part[0];
    let mmdd: string = part[1] + "-" + part[2];
    let newdate: string = newyear + "-" + mmdd;
    let newDate: any = new Date(newdate);
    if (newDate < now) {
      newyear = (parseInt(newyear) + 1).toString();
      newdate = newyear + "-" + mmdd;
    }
    //console.log("To Return: newdate", newdate);
    return newdate;

  };

}
