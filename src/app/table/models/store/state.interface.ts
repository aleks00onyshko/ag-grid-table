import { YoutubeItem } from '../response';

export interface TableState {
  videos: YoutubeItem[];
  selectionCount: number;
  selectionMode: boolean;
  allSelected: boolean;
  allUnselected: boolean;
  error: any;
}
