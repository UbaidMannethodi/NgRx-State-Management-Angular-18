import { addPost } from './posts.actions';
import {Action, createReducer, on} from '@ngrx/store';
import {initialState, PostsState} from './posts.state';

const _postsReducer = createReducer(
  initialState,
  on(addPost, (state, action) => {
    let post = { ...action.post };

    post.id = (state.posts.length + 1).toString();

    return {
      ...state,
      posts: [...state.posts, post],
    };
  })
);

export function postsReducer(state: PostsState | undefined, action: Action<string>) {
  return _postsReducer(state, action);
}
