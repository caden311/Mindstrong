import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";



@Injectable()
export class BaseUriHandler implements HttpInterceptor {
  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if(req.url.startsWith('http')) return next.handle(req);
    let newReq = req.clone({url: new URL(req.url, 'https://localhost:3000/' || '').href});
    return next.handle(newReq);
  }
}
