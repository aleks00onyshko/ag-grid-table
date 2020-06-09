export interface YoutubeResponse {
  etag: string;
  kind: string;
  nextPageToken: string;
  regionCode: string;

  items: YoutubeItem[];
  pageInfo: PageInfo;
}

export interface YoutubeItem {
  etag: string;
  kind: string;

  snippet: Snippet;
  id: ItemId;
}

export interface ItemId {
  kind: string;
  videoId: string;
}

export interface Snippet {
  channelId: string;
  channelTitle: string;
  description: string;
  liveBroadcastContent: string;
  publishTime: string;
  publishedAt: string;
  thumbnails: Thumbnails;
  title: string;
}

export interface Thumbnails {
  default: Thumbnail;
  high: Thumbnail;
  medium: Thumbnail;
}

export interface Thumbnail {
  url: string;
  width: number;
  height: number;
}

export interface PageInfo {
  totalResults: number;
  resultsPerPage: number;
}
