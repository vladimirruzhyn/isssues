import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Data } from '../models/data.model';
import { DataService } from '../service/data.service';

@Component({ selector: 'app-home', templateUrl: 'home.page.html', styleUrls: ['home.page.scss'] })
export class HomePage implements OnInit, OnDestroy {
  private subscription = new Subscription();
  tagList: string[];
  dataList: Data[];
  filter: string[];

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.subscription.add(
      this.dataService.getAllTag().subscribe((data) => {
        this.tagList = data;
      }),
    );
    this.subscription.add(
      this.dataService
        .getAllData()
        .pipe(tap((data) => (this.dataList = data)))
        .subscribe(),
    );
    this.subscription.add(
      this.dataService
        .getFilter()
        .pipe(tap((data) => (this.filter = data)))
        .subscribe(),
    );
  }

  ngAfterViewInit() {}

  deleteData(data: Data): void {
    this.subscription.add(this.dataService.delete(data).subscribe());
  }

  editData(data: Data): void {
    this.subscription.add(this.dataService.putData(data).subscribe());
  }

  addNew(data: Data): void {
    this.subscription.add(this.dataService.postData(data).subscribe());
  }

  addFilter(filter: string[]): void {
    this.subscription.add(this.dataService.addFilter(filter).subscribe());
  }

  getAllTag(): Observable<string[]> {
    return this.dataService.getAllTag().pipe(map((data) => (this.tagList = data)));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  addNewTag(tag: string): void {
    this.subscription.add(this.dataService.addNewTag(tag).subscribe());
  }
}
