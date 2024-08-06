import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {Post} from "../../models/posts.model";
import {AppState} from "../../store/app.state";
import {getPosts} from "../state/posts.selector";
import {RouterModule} from "@angular/router";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.css'],
  imports: [CommonModule, RouterModule],
  standalone: true
})
export class PostsListComponent implements OnInit {

  posts: Observable<Post[]>;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.posts = this.store.select(getPosts);
  }
}
