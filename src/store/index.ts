import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit'

import gallery from './slices/gallery'
import counter from './slices/counter'
import modals from './slices/modals'
import loading from './slices/loading'
import sentFormSlice from './slices/sentForm'

export const store = configureStore({
  reducer: { counter, modals, gallery , loading, sentFormSlice },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
