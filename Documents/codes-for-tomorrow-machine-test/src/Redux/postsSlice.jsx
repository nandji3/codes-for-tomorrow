import { createSlice } from "@reduxjs/toolkit";
import { getAllPostsDataAction } from "./postsAction";

const initialState = {
    posts: [],
    currentPage: 1,
    itemsPerPage: 6,
    isLoading: false,
};

const postsSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        currentPageAction(state, action) {
            state.currentPage = action.payload;
        },
        removePost(state, action) {
            state.posts = state.posts.filter(
                (post) => post.id !== action.payload
            );
        },
    },

    extraReducers: (builder) => {
        //Login and SignUp
        builder
            .addCase(getAllPostsDataAction.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllPostsDataAction.fulfilled, (state, action) => {
                state.posts = action.payload;
                state.isLoading = false;
            })
            .addCase(getAllPostsDataAction.rejected, (state, action) => {
                state.isLoading = false;
                console.log(action.payload);
            });
    },
});

export const { currentPageAction, removePost } = postsSlice.actions;
export default postsSlice.reducer;
