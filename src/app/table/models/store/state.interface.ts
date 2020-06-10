import { YoutubeItem } from '../response';

export interface TableState {
  videos: YoutubeItem[];
  selectionCount: number;
  selectionMode: boolean;
  allSelected: boolean;
  error: any;
}
