import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';

import { Observable, of } from 'rxjs';

import { environment } from 'src/environments/environment';
import { YoutubeResponse, YoutubeItem } from '../../models';

@Injectable({
  providedIn: 'root',
})
export class TableService {
  public videosMock: YoutubeItem[] = [
    {
      etag: 'etag',
      kind: 'king',

      snippet: {
        channelId: 'string',
        channelTitle: 'string',
        description: 'string',
        liveBroadcastContent: 'string',
        publishTime: 'string',
        publishedAt: 'string',
        thumbnails: {
          default: {
            url: 'string',
            width: 0,
            height: 0,
          },
          high: {
            url: 'string',
            width: 0,
            height: 0,
          },
          medium: {
            url: 'string',
            width: 0,
            height: 0,
          },
        },
        title: 'string',
      },
      id: {
        kind: 'string',
        videoId: 'string',
      },
    },
    {
      etag: 'etag',
      kind: 'king',

      snippet: {
        channelId: 'string',
        channelTitle: 'string',
        description: 'string',
        liveBroadcastContent: 'string',
        publishTime: 'string',
        publishedAt: 'string',
        thumbnails: {
          default: {
            url: 'string',
            width: 0,
            height: 0,
          },
          high: {
            url: 'string',
            width: 0,
            height: 0,
          },
          medium: {
            url: 'string',
            width: 0,
            height: 0,
          },
        },
        title: 'string',
      },
      id: {
        kind: 'string',
        videoId: 'string',
      },
    },
    {
      etag: 'etag',
      kind: 'king',

      snippet: {
        channelId: 'string',
        channelTitle: 'string',
        description: 'string',
        liveBroadcastContent: 'string',
        publishTime: 'string',
        publishedAt: 'string',
        thumbnails: {
          default: {
            url: 'string',
            width: 0,
            height: 0,
          },
          high: {
            url: 'string',
            width: 0,
            height: 0,
          },
          medium: {
            url: 'string',
            width: 0,
            height: 0,
          },
        },
        title: 'string',
      },
      id: {
        kind: 'string',
        videoId: 'string',
      },
    },
  ];

  constructor(private httpClient: HttpClient) {}

  public getVideos(): Observable<YoutubeItem[]> {
    return this.httpClient
      .get<YoutubeResponse>(environment.youtubeSearchUrl)
      .pipe(map((youtubeResponse: YoutubeResponse) => youtubeResponse.items));
  }
}
