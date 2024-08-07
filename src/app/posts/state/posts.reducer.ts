import {addPost, updatePost} from './posts.actions';
import {Action, createReducer, on} from '@ngrx/store';
import {initialState, PostsState} from './posts.state';

const _postsReducer = createReducer(
  initialState,
  on(addPost, (state: PostsState, action) => {
    let post = { ...action.post };

    post.id = (state.posts.length + 1).toString();

    return {
      ...state,
      posts: [...state.posts, post],
    };
  }),
  on(updatePost, (state, action: any) => {
    const updatedPosts = state.posts.map((post) => {
      return action.post.id === post.id ? action.post : post;
    });

    return {
      ...state,
      posts: updatedPosts,
    };
  })
);

export function postsReducer(state: PostsState | undefined, action: Action<string>): PostsState {
  return _postsReducer(state, action);
}
