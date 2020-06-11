import { getTestBed, TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { TableService } from './table.service';

describe('TableService', () => {
  let tableService: TableService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TableService],
    });

    tableService = TestBed.inject(TableService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should initialize TableService', () => {
    expect(tableService).toBeTruthy();
  });
});
