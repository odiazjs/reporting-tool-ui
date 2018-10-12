import { HttpWrapper } from "../common/barrel";
import { HttpResponse } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from 'rxjs/operators';

export class QueryOptions {
  public static toQueryString(paramsObject: any): string {
    return Object
      .keys(paramsObject)
      .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(paramsObject[key])}`)
      .join('&');
  }
}

export class ResourceService<T> {
  constructor(
    private httpClient: HttpWrapper<HttpResponse<T>>,
    private baseUrl: string,
    private serializer: (value: T) => T
  ) {

    }

  create(item: T): any {
    return this.httpClient
      .post<T>(`${this.baseUrl}`, item)
      .pipe(
        map(this.serializer)
      );
  }
  update(item: any): Observable<T> {
    return this.httpClient
      .put<T>(`${this.baseUrl}/${item.id}`, item)
      .pipe(
        map(this.serializer)
      );
  }
  getById(id: number): Observable<T> {
    return this.httpClient
      .get(`${this.baseUrl}/${id}`)
      .pipe(
        map(this.serializer)
      );
  }
  getList(paramsObject: any = {}): Observable<HttpResponse<T>> {
    return this.httpClient
      .get(`${this.baseUrl}`)
      .pipe(
        map((httpResponse: HttpResponse<T>) => {
          return httpResponse;
        })
      );
  }
  deleteById(id: number) {
    return this.httpClient
      .delete(`${this.baseUrl}/${id}`);
  }
};