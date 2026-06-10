import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../environments/environment.development';

export const baseUrlInterceptor: HttpInterceptorFn = (req, next) => {
  const newReq = req.clone({
    url: `${environment.baseUrl}${req.url}`
  })
  return next(req);
};
