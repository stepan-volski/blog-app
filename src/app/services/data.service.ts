import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs'; // Import BehaviorSubject
import { Post } from '../models/Post';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private allPosts$: BehaviorSubject<Post[]> = new BehaviorSubject(
    [] as Post[]
  );

  constructor() {
    this.initPosts();
  }

  private initPosts() {
    setTimeout(() => {
      let data = JSON.parse(localStorage.getItem('post-app-data') || '[]');
      this.allPosts$.next(data);
    }, 500);
  }

  public addPost(title: string, content: string) {
    let currentData = this.allPosts$.getValue();
    let newData = [
      ...currentData,
      { id: Date.now().toString(), title, content },
    ];
    localStorage.setItem('post-app-data', JSON.stringify(newData));
    this.allPosts$.next(newData);
  }

  public getPostbyId(id: string): Post {
    return this.allPosts$.getValue().filter((post) => post.id === id)[0];
  }

  public getAllPostsSubject() {
    return this.allPosts$;
  }
}
