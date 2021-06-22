import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Data } from 'src/app/models/data.model';
import { ApiService } from './api.service';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DataService extends ApiService {
  protected dataList: BehaviorSubject<Data[]> = new BehaviorSubject<Data[]>([]);

  public dataList$: Observable<Data[]> = this.dataList.asObservable();

  public reloadTag: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);

  public reloadTag$: Observable<string[]> = this.reloadTag.asObservable();

  public filter: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);

  public filter$: Observable<string[]> = this.filter.asObservable();

  constructor(protected httpClient: HttpClient) {
    super(httpClient);
  }

  getAllTag(): Observable<string[]> {
    if (this.reloadTag.value.length) {
      return this.reloadTag$;
    }
    return this.get<Data>().pipe(
      switchMap((dataList: Data[]) => {
        const tagList = dataList.reduce(
          (acc, item) => acc.concat(item.tags.filter((tegitem) => !acc.includes(tegitem))),
          [],
        );
        this.reloadTag.next(tagList);
        return this.reloadTag$;
      }),
    );
  }

  addNewTag(tag: string): Observable<string[]> {
    const tagList = this.reloadTag.value;
    tagList.push(tag);
    this.reloadTag.next(tagList);
    return of(tagList);
  }

  getFilter(): Observable<string[]> {
    return this.filter$;
  }

  addFilter(tagList: string[]): Observable<string[]> {
    this.filter.next(tagList);
    return of(tagList);
  }

  filteredData(): Observable<Data[]> {
    return this.filter$.pipe(
      switchMap((filter) => {
        return this.dataList$.pipe(
          map((data) => {
            if (filter.length) {
              return data.filter((item) => item.tags.find((itemTag) => filter.includes(itemTag)));
            }
            return data;
          }),
        );
      }),
    );
  }

  getAllData(): Observable<Data[]> {
    if (this.dataList.value.length) {
      return this.filteredData();
    }
    return this.get<Data>().pipe(
      switchMap((data) => {
        this.dataList.next(data);
        return this.filteredData();
      }),
    );
  }

  putData(data: Data): Observable<Data> {
    this.dataList.next(this.dataList.value.map((item) => (item.id === data.id ? data : item)));
    return of(data);
  }

  postData(data: Data): Observable<Data> {
    data.id = this.dataList.value.length;
    const dataList = this.dataList.value;
    dataList.push(data);
    this.dataList.next(dataList);
    return of(data);
  }

  delete(data: Data): Observable<string> {
    this.dataList.next(this.dataList.value.filter((item) => item.id !== data.id));
    return of('Ok');
  }
}
