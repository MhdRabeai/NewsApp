import { ApiService } from './services/api.service';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit {
  title = 'NewsApp';
  public sources: any = [];
  public articles: any = [];
  public selectedNewsChannel: string = 'Top 10 Trending News!';
  @ViewChild('sideNav') sideNav!: MatSidenav;
  constructor(private observer: BreakpointObserver, private api: ApiService) {}
  ngOnInit(): void {
    this.api.initArticles().subscribe((res) => {
      this.articles = res.articles;
      console.log(this.articles);
    });
    this.api.initSources().subscribe((res) => {
      this.sources = res.sources;
      console.log(this.sources);
    });
  }
  ngAfterViewInit(): void {
    setTimeout(() => {
      this.sideNav.opened = true;
      this.observer.observe(['(max-width:787px)']).subscribe((res) => {
        if (res?.matches) {
          this.sideNav.mode = 'over';
          this.sideNav.close();
        } else {
          this.sideNav.mode = 'side';
          this.sideNav.open();
        }
      });
    }, 0);
  }

  searchSource(source: any) {
    this.api.getArticlesById(source.id).subscribe((res) => {
      this.articles = res.articles;
      this.selectedNewsChannel = source.name;
    });
  }
}
