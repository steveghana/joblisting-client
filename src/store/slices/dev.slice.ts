import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { devApi } from '../services/dev.service';
import axios from 'axios';
import _api_url from '../../api/_api_url';
import { IDev } from '../../types/devs';

type initialStatetype = {
  devs: IDev[];
  isloading: boolean;
  isFetching: boolean;
  isError: boolean;
  error: any;
};
const initialState: initialStatetype = {
  devs: [],
  isloading: false,
  isFetching: false,
  isError: false,
  error: null,
};

export const fetchDevs = createAsyncThunk('devs/fetchDevs', async (_, { dispatch }) => {
  try {
    const url = `${_api_url.getApiUrl()}/developers`;
    const { data } = await axios.get(url);

    return data;
  } catch (error) {
    throw error;
  }
});

const devSlice = createSlice({
  name: 'devs',
  initialState,
  reducers: {
    startFetching: (state) => {
      state.isloading = true;
      state.isFetching = true;
      state.isError = false;
      state.error = {};
    },
    fetchingSuccess: (state, action) => {
      state.isloading = false;
      state.isFetching = false;
      state.isError = false;
      state.error = {};
      state.devs = action.payload;
    },
    fetchingError: (state, action) => {
      state.isloading = false;
      state.isFetching = false;
      state.isError = true;
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Handling the async thunk lifecycle
    builder.addCase(fetchDevs.pending, (state) => {
      state.isloading = true;
      state.isFetching = true;
    });
    builder.addCase(fetchDevs.fulfilled, (state, action) => {
      state.isloading = false;
      state.isFetching = false;
      state.devs = action.payload;
    });
    builder.addCase(fetchDevs.rejected, (state, action) => {
      state.isloading = false;
      state.isFetching = false;
      state.isError = true;
      state.error = action.error.message;
    });
  },
});

export const { startFetching, fetchingSuccess, fetchingError } = devSlice.actions;
export default devSlice.reducer;
