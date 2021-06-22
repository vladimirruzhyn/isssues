import { DataService } from './data.service';
import { BehaviorSubject, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ApiService } from './api.service';
import { addTagResult, expectedGetData, newTag, tagList } from '../helpers/test.helper';

describe('DataService', () => {
  let dataService: DataService;
  let apiService: jasmine.SpyObj<ApiService>;

  const reloadTag: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);

  beforeEach(() => {
    apiService = jasmine.createSpyObj('ApiService', ['get']);
    dataService = new DataService(apiService as any);
    apiService.get.and.returnValue(of(expectedGetData));
  });

  it('should be created', () => {
    expect(dataService).toBeTruthy();
  });

  it('Retrieving all data', (done) => {
    dataService.getAllData().subscribe((dataList) => {
      expect(dataList).toEqual(expectedGetData, 'expected heroes');
      done();
    });
  });

  it('Tagging testing', (done) => {
    Object.defineProperties(dataService, {
      reloadTag: {
        get: () => reloadTag,
        set: (data) => reloadTag.next(data),
        configurable: true,
        enumerable: true,
      },
    });

    reloadTag.next(tagList);

    dataService.addNewTag(newTag).subscribe((dataList) => {
      expect(dataList).toEqual(addTagResult);
      reloadTag.next(tagList);
      done();
    });
  });

  it('Testing get filter value', (done) => {
    dataService
      .addFilter(['test'])
      .pipe(
        switchMap((data) => {
          return dataService.getFilter();
        }),
      )
      .subscribe((data) => {
        expect(data).toEqual(['test']);
        done();
      });
  });

  it('Testing the filter setting', (done) => {
    dataService
      .addFilter(['test'])
      .pipe(
        switchMap((filter) => {
          return dataService.getAllData();
        }),
      )
      .subscribe((data) => {
        expect(data).toEqual(expectedGetData.filter((item) => item.tags.includes('test')));
        done();
      });
  });
});
