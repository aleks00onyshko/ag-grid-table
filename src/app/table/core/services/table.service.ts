import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { Observable, of } from 'rxjs';

import { environment } from 'src/environments/environment';
import { YoutubeResponse, YoutubeItem } from '../../models';

@Injectable({
  providedIn: 'root',
})
export class TableService {
  constructor(private httpClient: HttpClient) {}

  public getVideos(): Observable<YoutubeItem[]> {
    return this.httpClient
      .get<YoutubeResponse>(environment.youtubeSearchUrl)
      .pipe(map((youtubeResponse: YoutubeResponse) => youtubeResponse.items));
  }
}
