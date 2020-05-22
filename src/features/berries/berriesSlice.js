import { createSlice } from '@reduxjs/toolkit';

import { API_URL } from '../../constants';
import { getJSON, logError } from '../../util';

export const berriesSlice = createSlice({
  name: 'berries',
  initialState: {
    items: [],
    loading: false,
  },
  reducers: {
    requestBerries: (state) => {
      state.loading = true;
    },
    receiveBerries: (state, action) => {
      state.items = action.payload.results;
      state.loading = false;
    },
  },
});

export const { requestBerries, receiveBerries } = berriesSlice.actions;

export const fetchBerries = () => (dispatch) => {
  dispatch(requestBerries());
  return fetch(`${API_URL}/berry/?limit=64`)
    .then(getJSON, logError)
    .then((json) => dispatch(receiveBerries(json)));
};

export const selectBerries = (state) => state.berries;

export default berriesSlice.reducer;
