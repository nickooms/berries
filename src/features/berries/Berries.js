import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { selectBerries, fetchBerries } from './berriesSlice';

import BerriesTable from '../berries-table';

import '@material/react-list/dist/list.css';

export function Berries() {
  const berries = useSelector(selectBerries);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchBerries());
  }, [dispatch]);
  return berries && <BerriesTable berries={berries} />;
}
