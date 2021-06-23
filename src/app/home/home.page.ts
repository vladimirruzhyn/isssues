import { Component } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Issue } from '../models/issue.model';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {
  private subscription = new Subscription();
  dataList$: Observable<Issue[]> = this.dataService.getAllData();
  filter$: Observable<string[]> = this.dataService.getFilter();

  constructor(private dataService: DataService) {}

  deleteData(data: Issue): void {
    this.subscription.add(this.dataService.delete(data).subscribe());
  }

  editData(data: Issue): void {
    this.subscription.add(this.dataService.updateIssue(data).subscribe());
  }

  addNew(data: Issue): void {
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
