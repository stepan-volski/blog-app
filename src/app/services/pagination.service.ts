import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Post } from '../models/Post';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root',
})
export class PaginationService {
  allPosts$ = this.dataService.getAllPostsSubject();
  pagenatedPosts$ = new BehaviorSubject<Post[]>([]);

  public currentPage = 1;
  pageSize = 3;

  constructor(private dataService: DataService) {
    this.allPosts$.subscribe((posts) => {
      this.getPostsForCurrentPage();
    });
  }

  private getPostsForCurrentPage() {
    let pageStartIndex = this.pageSize * (this.currentPage - 1);
    let pageEndIndex = pageStartIndex + this.pageSize - 1;
    let allPosts = this.allPosts$.getValue();
    let displayedItems = allPosts.slice(pageStartIndex, pageEndIndex + 1);
    this.pagenatedPosts$.next(displayedItems);
  }

  public nextPage() {
    if (this.isAllowedScrollNextPage()) {
      this.currentPage++;
      this.getPostsForCurrentPage();
    }
  }

  public prevPage() {
    if (this.isAllowedScrollPrevPage()) {
      this.currentPage--;
      this.getPostsForCurrentPage();
    }
  }

  public isAllowedScrollNextPage() {
    let length = this.allPosts$.getValue().length;
    return this.currentPage < Math.ceil(length / this.pageSize);
  }

  public isAllowedScrollPrevPage() {
    return this.currentPage > 1;
  }

  public getPagenatedPosts() {
    return this.pagenatedPosts$;
  }
}

// TODO
// pass current page as query param to url
// save current page to local storage
//
