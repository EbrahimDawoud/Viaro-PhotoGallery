import { createSlice } from "@reduxjs/toolkit";
export const userSlice = createSlice({
    name: 'users',
    initialState: {
        currentUser: null
    },
    reducers: {
        setCurrentUser: (state, action) => {
            // console.log("current user", action.payload);
            state.currentUser = action.payload;
        }
    }
}
);
export const { setCurrentUser } = userSlice.actions;
export const selectCurrentUser = (state) => state.users.currentUser;
export default userSlice.reducer;