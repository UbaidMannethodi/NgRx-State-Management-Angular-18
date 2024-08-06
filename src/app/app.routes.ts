import { Routes } from '@angular/router';
import {PostsListComponent} from "./posts/posts-list/posts-list.component";
import {AddPostComponent} from "./posts/add-post/add-post.component";

export const routes: Routes = [
  {path: '', redirectTo: 'posts', pathMatch: 'full'},
  {
    path: 'posts',
    component: PostsListComponent,
    children: [{ path: 'add', component: AddPostComponent }],
  },
];
