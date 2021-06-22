import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ApiService } from '../service/api.service';
import { DataService } from '../service/data.service';

import { IssueItemComponent } from '../home/components/issue-item/issue-item.component';
import { SelectComponent } from '../home/components/select-component/select-component.component';

import { HomePage } from './home.page';
import { NgSelectModule } from '@ng-select/ng-select';
import { environment } from 'src/environments/environment';
import { expectedGetData, tagList } from '../helpers/test.helper';
import { CalculationPipe } from 'src/app/pipe/calculation.pipe';

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;

  let httpMock: HttpTestingController;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [HomePage, IssueItemComponent, SelectComponent, CalculationPipe],
        imports: [
          IonicModule.forRoot(),
          HttpClientTestingModule,
          FormsModule,
          NgSelectModule,
          ReactiveFormsModule,
        ],
        providers: [DataService, ApiService],
      }).compileComponents();

      fixture = TestBed.createComponent(HomePage);
      component = fixture.componentInstance;
      httpMock = TestBed.inject(HttpTestingController);
    }),
  );

  it('checking component creation', () => {
    expect(component).toBeTruthy();
  });

  it('testing data loading into a component', () => {
    fixture.detectChanges();
    const request = httpMock.match(`${environment.HTTP_URL}`);
    request.forEach((item) => {
      item.flush(expectedGetData);
    });
    fixture.detectChanges();
    expect(component.dataList).toEqual(expectedGetData);
    expect(component.filter).toEqual([]);
  });
});
