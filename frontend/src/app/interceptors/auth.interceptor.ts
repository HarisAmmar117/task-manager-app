
import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // Get token from localStorage
  const token = localStorage.getItem('authToken');
  
  // If token exists, clone request and add Authorization header
  if (token) {
    const clonedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    
    console.log('Request with token:', clonedReq.url);
    return next(clonedReq);
  }
  
  // If no token, proceed with original request
  return next(req);
};