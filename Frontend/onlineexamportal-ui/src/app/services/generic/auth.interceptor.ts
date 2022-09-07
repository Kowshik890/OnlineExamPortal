import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { UserService } from "../generic/user.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private userService: UserService) {

    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        
        // add the JWT token from localStorage request
        const token = this.userService.getToken();
        let authReq = req;
        if(token != null) {
            authReq = authReq.clone({
                setHeaders: { Authorization: `Bearer ${token}`},
            })
        }
        return next.handle(authReq);
    }
}

export const authInterceptorProvider = [
    {
        provide: HTTP_INTERCEPTORS,
        useClass: AuthInterceptor,
        multi: true,
    }
] 