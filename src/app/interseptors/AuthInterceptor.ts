import { Injectable } from "@angular/core";
import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from "@angular/common/http";
import { catchError } from "rxjs/operators";
import { throwError } from "rxjs";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    let authReq = request;
    const token = localStorage.getItem("token");

    if (token != null && token != undefined && token != "") {
      authReq = request.clone({
        headers: request.headers.set("Authorization", "Bearer " + token),
      }); 
    }
    return next.handle(authReq).pipe(
      catchError((err) => {
        if ((err && err.status === 401) || err.status === 0) {
          localStorage.clear();
          err.error = { Message: "", status: 0 };
          err.error.status = 401;
          location.reload();
        }
        const error = err.error.message || err.statusText;
        return throwError(err);
      })
    );
  }
}
