import { createSlice } from '@reduxjs/toolkit';

import { getJSON, logError } from '../../util';
import { API_URL } from '../../constants';

export const berryListItemSlice = createSlice({
  name: 'berry',
  initialState: {
    items: {},
    loading: false,
    berryItems: {},
    loadingBerryItems: false,
  },
  reducers: {
    requestBerry: (state) => {
      state.loading = true;
    },
    receiveBerry: (state, action) => {
      state.items[action.payload.id] = action.payload;
      state.loading = false;
    },
    requestBerryItem: (state) => {
      state.loadingBerryItems = true;
    },
    receiveBerryItem: (state, action) => {
      state.berryItems[action.payload.berryId] = action.payload;
      state.loadingBerryItems = false;
    },
  },
});

export const {
  requestBerry,
  receiveBerry,
  requestBerryItem,
  receiveBerryItem,
} = berryListItemSlice.actions;

export const fetchBerry = (berry) => (dispatch) => {
  dispatch(requestBerry());
  return fetch(berry.url)
    .then(getJSON, logError)
    .then((json) => {
      dispatch(receiveBerry(json));
      const { item } = json;
      const id = berry.url.replace(`${API_URL}/berry/`, '').replace('/', '');
      dispatch(fetchBerryItem({ ...item, berryId: id }));
    });
};

export const fetchBerryItem = (berry) => (dispatch) => {
  dispatch(requestBerryItem());
  return fetch(berry.url)
    .then(getJSON, logError)
    .then(({ category, id, sprites }) =>
      dispatch(
        receiveBerryItem({ category, id, sprites, berryId: berry.berryId })
      )
    );
};

export const selectBerry = (state) => state.berry;

export default berryListItemSlice.reducer;
