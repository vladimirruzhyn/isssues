import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { issues } from '../models/issues.model';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {
  private subscription = new Subscription();
  dataList$: Observable<issues[]>;
  filter$: Observable<string[]>;

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.dataList$ = this.dataService.getAllData();
    this.filter$ = this.dataService.getFilter();
  }

  deleteData(data: issues): void {
    this.subscription.add(this.dataService.delete(data).subscribe());
  }

  editData(data: issues): void {
    this.subscription.add(this.dataService.updateIssue(data).subscribe());
  }

  addNew(data: issues): void {
    this.subscription.add(this.dataService.createIssue(data).subscribe());
  }

  addFilter(filter: string[]): void {
    this.subscription.add(this.dataService.addFilter(filter).subscribe());
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  addNewTag(tag: string): void {
    this.subscription.add(this.dataService.addNewTag(tag).subscribe());
  }
}
