import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { exhaustMap, map, take } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AppState } from '@core/models/appState';
@Injectable()
export class HeaderInterceptor implements HttpInterceptor {
  constructor(private store: Store<AppState>) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.store.select('auth')
      .pipe(
        take(1),
        map((authState) => authState.user),
        exhaustMap((user: any) => {
          if (!user) {
            return next.handle(req);
          }
          const authReq = req.clone({ params: new HttpParams().set('auth', user.token) });
          return next.handle(authReq);
        }
        )
      );
  }
}