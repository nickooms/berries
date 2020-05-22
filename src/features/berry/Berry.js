import React, { useEffect } from 'react';
import { Row, Cell } from '../../components/Table';
import { useSelector, useDispatch } from 'react-redux';

import { selectBerry, fetchBerry } from './berrySlice';
import { API_URL } from '../../constants';

import '@material/react-list/dist/list.css';

const styles = {
  text: {
    textTransform: 'capitalize',
  },
};

export function BerryListItem({ berry, index }) {
  const dispatch = useDispatch();
  const berryListItem = useSelector(selectBerry);
  const id = berry.url.replace(`${API_URL}/berry/`, '').replace('/', '');
  useEffect(() => {
    dispatch(fetchBerry(berry));
  }, [berry, dispatch]);
  const listItem = berryListItem.items[id];
  const listItem2 = berryListItem.berryItems[id];
  const img = listItem2 && listItem2.sprites.default;
  // console.log(berryListItem);
  return (
    <Row
      key={index}
      id={`u${index}`}
      onRowSelectionChanged={() => {
        console.log(6666);
      }}
    >
      <Cell>{img && <img alt="" src={img} />}</Cell>
      <Cell numeric>{id}</Cell>
      <Cell style={styles.text}>{berry.name}</Cell>
      <Cell numeric id={`u${index}`}>
        {listItem && listItem.growth_time}
      </Cell>
      <Cell numeric>{listItem && listItem.max_harvest}</Cell>
      <Cell style={styles.text}>
        {listItem && listItem.firmness && listItem.firmness.name}
      </Cell>
      <Cell numeric>{listItem && listItem.size}</Cell>
      <Cell numeric>{listItem && listItem.smoothness}</Cell>
      <Cell numeric>{listItem && listItem.soil_dryness}</Cell>
      <Cell style={styles.text}>{listItem2 && listItem2.category.name}</Cell>
    </Row>
  );
}
