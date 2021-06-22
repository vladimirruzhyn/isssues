import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NgSelectModule } from '@ng-select/ng-select';
import { expectedGetData, tagList } from 'src/app/helpers/test.helper';
import { ApiService } from 'src/app/service/api.service';
import { DataService } from 'src/app/service/data.service';
import { environment } from 'src/environments/environment';

import { SelectComponent } from './select-component.component';

describe('SelectComponent', () => {
  let component: SelectComponent;
  let fixture: ComponentFixture<SelectComponent>;
  let httpMock: HttpTestingController;
  let dataService: DataService;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [SelectComponent],
        imports: [
          IonicModule.forRoot(),
          HttpClientTestingModule,
          FormsModule,
          NgSelectModule,
          ReactiveFormsModule,
        ],
        providers: [DataService, ApiService],
      }).compileComponents();

      fixture = TestBed.createComponent(SelectComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
      httpMock = TestBed.inject(HttpTestingController);
      dataService = TestBed.inject(DataService);
    }),
  );

  it('checking component creation', () => {
    expect(component).toBeTruthy();
  });

  it('tag loading testing', () => {
    fixture.detectChanges();
    const request = httpMock.match(`${environment.HTTP_URL}`);
    request.forEach((item) => {
      item.flush(expectedGetData);
    });
    expect(component.tagList).toEqual(tagList);
  });
});
