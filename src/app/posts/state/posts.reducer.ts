import {addPost, deletePost, UPDATE_POST_ACTION, DELETE_POST_ACTION, updatePost} from './posts.actions';
import {Action, createReducer, on} from '@ngrx/store';
import {initialState, PostsState} from './posts.state';
import {Post} from "../../models/posts.model";

export interface UpdatePostAction extends Action {
  type: typeof UPDATE_POST_ACTION;
  post: Post;
}

export interface DeletePostAction extends Action {
  type: typeof DELETE_POST_ACTION;
  id: string;
}

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
  on(updatePost, (state: PostsState, action: UpdatePostAction) => {
    const updatedPosts = state.posts.map((post) => {
      return action.post.id === post.id ? action.post : post;
    });

    return {
      ...state,
      posts: updatedPosts,
    };
  }),
  on(deletePost, (state: PostsState, action: DeletePostAction) => {
    const filteredPosts = state.posts.filter( post => {
      return action.id !== post.id
    })

    return {
      ...state,
      posts: filteredPosts
    }
  })
);

export function postsReducer(state: PostsState | undefined, action: Action<string>): PostsState {
  return _postsReducer(state, action);
}
