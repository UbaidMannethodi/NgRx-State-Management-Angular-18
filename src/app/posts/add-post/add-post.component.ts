import { addPost } from '../state/posts.actions';
import { Post } from '../../models/posts.model';
import {FormGroup, FormControl, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {AppState} from "../../store/app.state";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css'],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  standalone: true
})
export class AddPostComponent implements OnInit {
  postForm: FormGroup;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.initFormGroup();
  }

  initFormGroup(): void {
    this.postForm = new FormGroup({
      title: new FormControl(null, [Validators.required, Validators.minLength(6),
      ]),
      description: new FormControl(null, [Validators.required, Validators.minLength(10),
      ]),
    });
  }

  showDescriptionErrors(): string {
    const descriptionForm = this.postForm.get('description');
    if (descriptionForm?.touched && !descriptionForm.valid) {
      if (descriptionForm?.errors?.['required'] && descriptionForm) {
        return 'Description is required';
      }

      if (descriptionForm?.errors?.['minlength']) {
        return 'Description should be of minimum 10 characters length';
      }
    }
    return '';
  }

  onAddPost() {
    if (!this.postForm.valid) {
      return;
    }

    const post: Post = {
      title: this.postForm.value.title,
      description: this.postForm.value.description,
    };

    this.store.dispatch(addPost({ post }));
  }
}
