import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { postsApi } from "../utils/ThemeSuspense/postApi";


export const getAllPostsDataAction = createAsyncThunk(
    "getAllPosts",
    async (data, { rejectWithValue }) => {
        try {
            const response = await axios(postsApi);
            const allPostsData = response.data;
            // console.log(
            //     "allPostsData inside the getAllPostsDataAction ---> ",
            //     response
            // );
            return allPostsData;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);
