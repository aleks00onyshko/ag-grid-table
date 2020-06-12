import { TestBed } from '@angular/core/testing';

import { TableResolver } from './table.resolver';
import { TableFacade } from '../../store';

class MockTableFacade {
  getVideos() {}
}

describe('Table Resolver', () => {
  let tableResolver: TableResolver;
  let tableFacade: MockTableFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TableResolver,
        { provide: TableFacade, useClass: MockTableFacade },
      ],
    });

    tableResolver = TestBed.inject(TableResolver);
    tableFacade = TestBed.inject(TableFacade);
  });

  it('should initialize TableResolver', () => {
    expect(tableResolver).toBeTruthy();
  });

  it('should call appropriate method in facade', () => {
    spyOn(tableFacade, 'getVideos');

    tableResolver.resolve();

    expect(tableFacade.getVideos).toHaveBeenCalled();
  });
});
