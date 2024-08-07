import { PostsState } from './posts.state';
import { createFeatureSelector, createSelector } from '@ngrx/store';

const getPostsState = createFeatureSelector<PostsState>('posts');

export const getPosts = createSelector(getPostsState, (state: PostsState) => {
  return state.posts;
});

export const getPostById = (props: { id: string; }) => createSelector(getPostsState, (state: PostsState) => {
  return state.posts.find((post) => post.id === props.id);
});
