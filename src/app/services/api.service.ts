import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  apiKey = 'aed20dd2f66244a4bef4592b6b43614d';
  constructor(private http: HttpClient) {}
  initSources() {
    return this.http.get<any>(
      'https://newsapi.org/v2/sources?language=en&apiKey=' + this.apiKey
    );
  }

  initArticles() {
    return this.http.get<any>(
      'https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=' +
        this.apiKey
    );
  }
  getArticlesById(source: string) {
    return this.http.get<any>(
      'https://newsapi.org/v2/top-headlines?sources=' +
        source +
        '&apiKey=' +
        this.apiKey
    );
  }
}
