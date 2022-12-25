import { createSlice } from '@reduxjs/toolkit';

const postSlice = createSlice({
    name: 'post',
    initialState: {
        post: {
            currentPost: null,
        },
        saved: {
            changeSaved: false,
        },
        removed: {
            isRemove: false,
            postId: null,
        },
        modal: {
            show: false,
        },
    },
    reducers: {
        currentPost: (state, action) => {
            state.post.currentPost = action.payload;
        },
        savedPostItemChange: (state) => {
            state.saved.changeSaved = !state.saved.changeSaved;
        },
        removedItem: (state, action) => {
            state.removed.isRemove = !state.removed.isRemove;
            state.removed.postId = action.payload;
        },
        changeModal: (state) => {
            state.modal.show = !state.modal.show;
        },
    },
});

export const { currentPost, savedPostItemChange, removedItem, changeModal } =
    postSlice.actions;
export default postSlice.reducer;
