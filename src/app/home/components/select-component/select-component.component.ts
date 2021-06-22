import { Component, Input, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-select-component',
  templateUrl: './select-component.component.html',
  styleUrls: ['./select-component.component.scss'],
})
export class SelectComponent implements OnInit, OnDestroy {
  private subscription = new Subscription();

  tagList: string[];

  @Input()
  selectedTag: string[];

  @Output()
  onAddNewTag: EventEmitter<string> = new EventEmitter<string>();

  @Output()
  onSelect: EventEmitter<string[]> = new EventEmitter<string[]>();

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.subscription.add(this.dataService.getAllTag().subscribe((data) => (this.tagList = data)));
  }

  compareWith(item, select): boolean {
    return item == select;
  }

  add = (value) => {
    this.onAddNewTag.emit(value);
    return value;
  };

  change($event) {
    this.onSelect.emit($event);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
