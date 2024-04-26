import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface LoadingState {
  show: boolean;
  models: boolean
  video: boolean
}

const initialState: LoadingState = {
  show: true,
  models: false,
  video: false
};

export const loadingSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    setShow: (state, action: PayloadAction<boolean>) => {
      state.show = action.payload;
    },
    setModelsLoaded: (state, action: PayloadAction<boolean>) => {
      state.models = action.payload
    },
    setVideoLoaded: (state, action: PayloadAction<boolean>) => {
      state.video = action.payload
    }
  },
});

// Action creators are generated for each case reducer function
export const { setShow, setModelsLoaded, setVideoLoaded } = loadingSlice.actions;

export default loadingSlice.reducer;
