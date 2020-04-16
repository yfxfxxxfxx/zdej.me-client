import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpImageService {

  constructor(private http: HttpClient) { }
  // TODO: update once actual server location determined
  apiUrl = 'http://localhost/image';

  private static handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'An error occurred; please try again later.');
  }

  /** post image to server as binary */
  postImage(file, conversionType, contrast): Observable<any> {
    const formData = new FormData();
    formData.append('file', file, file.name);
    formData.append('conversion-type', conversionType);
    formData.append('contrast', contrast + 'F');
    // @ts-ignore
    return this.http.post<any>(this.apiUrl, formData, {observe: 'events', responseType: 'text'})
      .pipe(
        tap(response => console.log('in postImage() from service, response = ', response)),
        catchError(HttpImageService.handleError)
      );
  }

  getImage(imageUrl) {
    // @ts-ignore
    return this.http.get<any>(imageUrl, { responseType: 'blob'});
  }

  getAllImages() {
    return this.http.get<any>(this.apiUrl);
  }
}
