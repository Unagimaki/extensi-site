import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface LoadingState {
  show: boolean;
}

const initialState: LoadingState = {
  show: true,
};

export const loadingSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    setShow: (state, action: PayloadAction<boolean>) => {
      state.show = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setShow } = loadingSlice.actions;

export default loadingSlice.reducer;
