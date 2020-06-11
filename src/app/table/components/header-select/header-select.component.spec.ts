import { TestBed, async, ComponentFixture } from '@angular/core/testing';

import { TableFacade } from '../../store';
import { HeaderSelectComponent } from './header-select.component';

class MockTableFacade {
  toggleOverallSelection() {}
}

describe('HeaderSelectComponent', () => {
  let component: HeaderSelectComponent;
  let fixture: ComponentFixture<HeaderSelectComponent>;
  let tableFacade: MockTableFacade;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderSelectComponent],
      providers: [{ provide: TableFacade, useClass: MockTableFacade }],
    });

    fixture = TestBed.createComponent(HeaderSelectComponent);
    component = fixture.componentInstance;
    tableFacade = TestBed.inject(TableFacade);
  }));

  it('should create the HeaderSelectComponent', () => {
    expect(component).toBeTruthy();
  });

  it('toggleOverallSelection() should call appropriate method in facade', () => {
    spyOn(tableFacade, 'toggleOverallSelection');

    component.toggleOverallSelection();

    expect(tableFacade.toggleOverallSelection).toHaveBeenCalled();
  });

  it('should toggle overall selection state, when checkbox is clicked', async () => {
    spyOn(component, 'toggleOverallSelection');

    let checkbox = fixture.debugElement.nativeElement.querySelector('input');
    checkbox.click();

    fixture.whenStable().then(() => {
      expect(component.toggleOverallSelection).toHaveBeenCalled();
    });
  });
});
