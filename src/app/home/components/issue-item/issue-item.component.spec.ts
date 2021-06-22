import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { IonicModule } from '@ionic/angular';
import { NgSelectModule } from '@ng-select/ng-select';
import { CalculationPipe } from 'src/app/pipe/calculation.pipe';
import { ApiService } from 'src/app/service/api.service';
import { DataService } from 'src/app/service/data.service';
import { SelectComponent } from '../select-component/select-component.component';

import { IssueItemComponent } from './issue-item.component';

describe('IssueItemComponent', () => {
  let component: IssueItemComponent;
  let fixture: ComponentFixture<IssueItemComponent>;

  const item = {
    id: 1,
    title: 'This is an item',
    text: 'This is a description of the item, it mightdescribe a bug/task/comment, itcan also display <a href=” www.google.com ”>Links</a>”',
    tags: ['bug'],
  };

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [IssueItemComponent, SelectComponent, CalculationPipe],
        imports: [
          IonicModule.forRoot(),
          HttpClientTestingModule,
          FormsModule,
          NgSelectModule,
          ReactiveFormsModule,
        ],
        providers: [DataService, ApiService],
      }).compileComponents();

      fixture = TestBed.createComponent(IssueItemComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    }),
  );

  it('checking component creation', () => {
    expect(component).toBeTruthy();
  });

  it('testing a form to display data', () => {
    component.item = item;
    fixture.detectChanges();
    const de = fixture.debugElement.query(By.css('.body div'));
    expect(de.nativeElement.textContent).toEqual(item.text.replace(/<[^>]*>?/gm, ''));
  });

  it('testing the form for data editing', () => {
    component.item = item;
    fixture.detectChanges();
    const de = fixture.debugElement.query(By.css('.body div'));
    expect(de.nativeElement.textContent).toEqual(item.text.replace(/<[^>]*>?/gm, ''));
    fixture.debugElement.query(By.css('#edit')).nativeElement.click();
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('#save'))).toBeTruthy();
    expect(fixture.debugElement.query(By.css('ion-textarea'))).toBeTruthy();
    expect(fixture.debugElement.query(By.css('app-select-component'))).toBeTruthy();
    spyOn(component.onEdit, 'emit');
    fixture.debugElement.query(By.css('#save')).nativeElement.click();
    expect(component.onEdit.emit).toHaveBeenCalled();
  });

  it('testing the form to create new data', () => {
    fixture.detectChanges();
    component.new = true;
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('#save'))).toBeTruthy();
    expect(fixture.debugElement.query(By.css('ion-textarea'))).toBeTruthy();
    expect(fixture.debugElement.query(By.css('app-select-component'))).toBeTruthy();
  });
});
