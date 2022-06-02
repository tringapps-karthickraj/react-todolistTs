import { configureStore } from '@reduxjs/toolkit';
import list from './reducer';

const store =  configureStore({
  reducer: {
    web: list,
  },
})

export default store;
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch