import {
  getVideos,
  getVideosSuccess,
  getVideosFail,
  selectionChanged,
  toggleSelectionMode,
  toggleOverallSelection,
} from './table.actions';

describe('Table actions', () => {
  it('should create an getVideos action', () => {
    const action = getVideos();

    expect({ ...action }).toEqual({ type: '[Table] Get Videos' });
  });

  it('should create an getVideosSuccess action', () => {
    const videos = [{ video: 'some video' }] as any;
    const action = getVideosSuccess({ videos });

    expect({ ...action }).toEqual({
      type: '[Table] Get Videos Success',
      videos,
    });
  });

  it('should create an getVideosFail action', () => {
    const error = 'some error';
    const action = getVideosFail({ error });

    expect({ ...action }).toEqual({
      type: '[Table] Get Videos Fail',
      error,
    });
  });

  it('should create an selectionChanged action', () => {
    const selectionCount = 1;
    const action = selectionChanged({ selectionCount });

    expect({ ...action }).toEqual({
      type: '[Table] Selection Changed',
      selectionCount,
    });
  });

  it('should create an toggleSelectionMode action', () => {
    const mode = true;
    const action = toggleSelectionMode({ selectionMode: mode });

    expect({ ...action }).toEqual({
      type: '[Table] Selection Mode Toggled',
      selectionMode: mode,
    });
  });

  it('should create an toggleOverallSelection action', () => {
    const mode = true;
    const action = toggleOverallSelection({ allSelected: mode });

    expect({ ...action }).toEqual({
      type: '[Table] Toggle Overall Selection',
      allSelected: mode,
    });
  });
});
