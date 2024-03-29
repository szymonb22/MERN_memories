import * as api from '../api';
import { COMMENT, START_LOADING, FETCH_POST, END_LOADING, FETCH_BY_SEARCH, FETCH_ALL, CREATE, UPDATE, DELETE, LIKE } from '../constants/actionTypes';
//action createos
export const getPost = (id) => async (dispatch) => {

    try {
        dispatch({ type: START_LOADING });
        const { data } = await api.fetchPost(id);
        console.log(data);
        dispatch({ type: FETCH_POST, payload: data })
        dispatch({ type: END_LOADING });
    } catch (error) {
        console.log(error.message);
    }
}
export const getPosts = (page) => async (dispatch) => {

    try {
        dispatch({ type: START_LOADING });
        const { data } = await api.fetchPosts(page);
        //1.15.51
        console.log(data);
        dispatch({ type: FETCH_ALL, payload: data })
        dispatch({ type: END_LOADING });
    } catch (error) {
        console.log(error.message);
    }
}

export const getPostsBySearch = (searchQuery) => async (dispatch) => {

    try {
        dispatch({ type: START_LOADING });

        const { data: { data } } = await api.fetchPostsBySearch(searchQuery);
        const res = await api.fetchPosts();
        console.log(res.data);
        dispatch({ type: FETCH_BY_SEARCH, payload: data })
        dispatch({ type: END_LOADING });

    } catch (error) {
        console.log(error.message);
    }
}

export const createPost = (post, history) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });

        const { data } = await api.createPost(post);
        history.push(`/posts/${data._id}`)
        dispatch({ type: CREATE, payload: data });
        dispatch({ type: END_LOADING });

    } catch (error) {
        console.log(error);
    }
};

export const updatePost = (id, post) => async (dispatch) => {

    try {
        const { data } = await api.updatePost(id, post);
        dispatch({ type: UPDATE, payload: data })
    } catch (error) {
        console.log(error.message);
    }
}

export const deletePost = (id) => async (dispatch) => {
    try {
        await api.deletePost(id);
        dispatch({ type: DELETE, payload: id })
    } catch (error) {
        console.log(error)
    }
}

export const likePost = (id) => async (dispatch) => {

    try {
        const { data } = await api.likePost(id);
        dispatch({ type: LIKE, payload: data })
    } catch (error) {
        console.log(error.message);
    }
}
export const commentPost = (value, id) => async (dispatch) => {

    try {
        const { data } = await api.commentPost(value, id);
        dispatch({ type: COMMENT, payload: data })
        return data.comments;
    } catch (error) {
        console.log(error.message);
    }
}