import { TestBed, async, ComponentFixture } from '@angular/core/testing';

import { TableFacade } from '../../store';
import { ToolbarComponent } from './toolbar.component';

class MockTableFacade {
  toggleSelectionMode() {}
}

describe('ToolbarComponent', () => {
  let component: ToolbarComponent;
  let fixture: ComponentFixture<ToolbarComponent>;
  let tableFacade: MockTableFacade;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ToolbarComponent],
      providers: [{ provide: TableFacade, useClass: MockTableFacade }],
    });

    fixture = TestBed.createComponent(ToolbarComponent);
    component = fixture.componentInstance;
    tableFacade = TestBed.inject(TableFacade);
  }));

  it('should create the ToolbarComponent', () => {
    expect(component).toBeTruthy();
  });

  it('toggleSelectionMode() should call appropriate method in facade', () => {
    spyOn(tableFacade, 'toggleSelectionMode');

    component.toggleSelectionMode();

    expect(tableFacade.toggleSelectionMode).toHaveBeenCalled();
  });

  it('should toggle selection mode, when checkbox is clicked', async () => {
    spyOn(component, 'toggleSelectionMode');

    let button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();

    fixture.whenStable().then(() => {
      expect(component.toggleSelectionMode).toHaveBeenCalled();
    });
  });
});
