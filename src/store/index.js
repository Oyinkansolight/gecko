import { configureStore } from '@reduxjs/toolkit';

import appReducer from '../features/app';

export const store = configureStore({
  reducer: {
    app: appReducer,
  },
});
