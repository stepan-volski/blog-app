import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss'],
})
export class CreatePostComponent implements OnInit {
  myForm: FormGroup;

  constructor(
    private router: Router,
    private data: DataService,
    private fb: FormBuilder
  ) {
    this.myForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(20)]],
      content: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  ngOnInit(): void {}

  get title() {
    return this.myForm.get('title');
  }

  get content() {
    return this.myForm.get('content');
  }

  submit() {
    if (this.myForm.valid) {
      this.data.addPost(this.myForm.value.title, this.myForm.value.content);
      this.router.navigate(['']);
    }
  }

  cancel() {
    this.router.navigate(['']);
  }
}
