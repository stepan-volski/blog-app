import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './components/main-page/main-page.component';
import { PostDetailsComponent } from './components/post-details/post-details.component';
import { CreatePostComponent } from './components/create-post/create-post.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: '', component: MainPageComponent },
  { path: 'details', component: PostDetailsComponent },
  { path: 'new', component: CreatePostComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
