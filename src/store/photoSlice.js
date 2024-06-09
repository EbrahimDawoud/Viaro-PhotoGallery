import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_KEY = 'Op2AEwG7xCAgal8bXCPbwDytRy6YabBfbDvzQpx7o3PH7UYAP75LCikt'; // Replace with your Pexels API Key

export const fetchPhotos = createAsyncThunk('photos/fetchPhotos', async () => {
  const response = await axios.get('https://api.pexels.com/v1/curated', {
    headers: {
      Authorization: API_KEY,
    },
    params: {
      per_page: 20, // Number of photos to fetch
    },
  });
  return response.data.photos;
});

const photosSlice = createSlice({
  name: 'photos',
  initialState: {
    photos: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPhotos.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPhotos.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.photos = action.payload;
        console.log(action.payload);
      })
      .addCase(fetchPhotos.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default photosSlice.reducer;
