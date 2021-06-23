import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable, of } from 'rxjs';
import { Issue } from 'src/app/models/issue.model';
import { ApiService } from './api.service';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DataService extends ApiService {
  protected dataList: BehaviorSubject<Issue[]> = new BehaviorSubject<Issue[]>([]);

  public dataList$: Observable<Issue[]> = this.dataList.asObservable();

  protected reloadTag: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);

  public reloadTag$: Observable<string[]> = this.reloadTag.asObservable();

  public filter: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);

  constructor(protected httpClient: HttpClient) {
    super(httpClient);
  }

  getAllTag(): Observable<string[]> {
    if (this.reloadTag.value.length) {
      return this.reloadTag$;
    }
    return this.get<Issue>().pipe(
      switchMap((dataList: Issue[]) => {
        const tagList = dataList.reduce(
          (acc, item) => acc.concat(item.tags.filter((tagItem) => !acc.includes(tagItem))),
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
    return this.filter;
  }

  addFilter(tagList: string[]): Observable<string[]> {
    this.filter.next(tagList);
    return of(tagList);
  }

  filteredData(): Observable<Issue[]> {
    return combineLatest([this.filter, this.dataList$]).pipe(
      map(([filter, data]) =>
        filter.length
          ? data.filter((item) => item.tags.find((itemTag) => filter.includes(itemTag)))
          : data
      ),
    );
  }

  getAllData(): Observable<Issue[]> {
    if (this.dataList.value.length) {
      return this.filteredData();
    }
    return this.get<Issue>().pipe(
      switchMap((data) => {
        this.dataList.next(data);
        return this.filteredData();
      }),
    );
  }

  updateIssue(data: Issue): Observable<Issue> {
    this.dataList.next(this.dataList.value.map((item) => (item.id === data.id ? data : item)));
    return of(data);
  }

  createIssue(data: Issue): Observable<Issue> {
    data.id = Date.now();
    const dataList = this.dataList.value;
    dataList.push(data);
    this.dataList.next(dataList);
    return of(data);
  }

  delete(data: Issue): Observable<string> {
    this.dataList.next(this.dataList.value.filter((item) => item.id !== data.id));
    return of('Ok');
  }
}
