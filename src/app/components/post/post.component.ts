import { Component, OnInit, Input } from '@angular/core';
import { Post } from 'src/app/models/Post';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {
  @Input() data!: Post;

  constructor(private router: Router) {}

  ngOnInit(): void {}

  openDetails() {
    this.router.navigate(['details'], { queryParams: { id: this.data.id } });
  }
}
