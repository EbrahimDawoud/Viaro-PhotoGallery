import { configureStore } from '@reduxjs/toolkit';

import userSlice from './userSlice.js';
import photosSlice from './photoSlice.js';

export default configureStore({
  reducer: {
    users: userSlice,
    photos: photosSlice
  }
})