import {FormGroup, FormControl, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { Post } from '../../models/posts.model';
import { AppState } from '../../store/app.state';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import {getPostById} from "../state/posts.selector";
import {updatePost} from "../state/posts.actions";

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css'],
  imports: [FormsModule, ReactiveFormsModule],
  standalone: true
})
export class EditPostComponent implements OnInit, OnDestroy {

  private route = inject(ActivatedRoute);
  private store = inject(Store<AppState>)
  private router = inject(Router);

  post: Post;
  postForm: FormGroup;
  postSubscription: Subscription;

  constructor() {}

  ngOnInit(): void {
    this.getRouterParams();
  }

  getRouterParams(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id') as string;
      this.postSubscription = this.store
        .select(getPostById({id}))
        .subscribe((data: any) => {
          this.post = data;
          this.createForm();
        });
    });
  }

  createForm() {
    this.postForm = new FormGroup({
      title: new FormControl(this.post.title, [
        Validators.required,
        Validators.minLength(6),
      ]),
      description: new FormControl(this.post.description, [
        Validators.required,
        Validators.minLength(10),
      ]),
    });
  }

  onSubmit() {
    if (!this.postForm.valid) {
      return;
    }

    const title = this.postForm.value.title;
    const description = this.postForm.value.description;

    const post: Post = {
      id: this.post.id,
      title,
      description,
    };

    //dispatch the action
    this.store.dispatch(updatePost({ post }));
    this.router.navigate(['posts']);
  }

  ngOnDestroy() {
    if (this.postSubscription) {
      this.postSubscription.unsubscribe();
    }
  }
}
