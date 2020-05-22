import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import berriesReducer from '../features/berries/berriesSlice';
import berryReducer from '../features/berry/berrySlice';

const middleware = getDefaultMiddleware({
  immutableCheck: false,
  serializableCheck: false,
});

export default configureStore({
  reducer: {
    berries: berriesReducer,
    berry: berryReducer,
  },
  middleware,
});
