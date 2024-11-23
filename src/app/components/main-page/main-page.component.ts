import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Post } from 'src/app/models/Post';
import { AuthService } from 'src/app/services/auth.service';
import { PaginationService } from 'src/app/services/pagination.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit {
  pagenatedPosts$ = new BehaviorSubject<Post[]>([]);

  constructor(
    private router: Router,
    public auth: AuthService,
    public paginationService: PaginationService
  ) {}

  ngOnInit(): void {
    this.pagenatedPosts$ = this.paginationService.getPagenatedPosts();
  }

  createPost() {
    this.router.navigate(['new']);
  }

  nextPage() {
    this.paginationService.nextPage();
  }

  prevPage() {
    this.paginationService.prevPage();
  }

  login() {
    this.auth.login();
  }

  logout() {
    this.auth.logout();
  }
}
