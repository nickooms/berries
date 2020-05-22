import React, { useState } from 'react';
import IconButton from '@material/react-icon-button';
import MaterialIcon from '@material/react-material-icon';
import TextField, { HelperText, Input } from '@material/react-text-field';
import { useDispatch } from 'react-redux';
import { MDCChipSet } from '@material/chips';

import Table, { HeaderRow, HeaderColumn, THead, TBody } from '../../components/Table';
import { BerryListItem } from '../berry/Berry';

import '@material/data-table/dist/mdc.data-table.css';
import '@material/react-icon-button/dist/icon-button.css';
import '@material/react-text-field/dist/text-field.css';
import '@material/chips/dist/mdc.chips.css';

const chipSetEl = document.querySelector('.mdc-chip-set');
if (chipSetEl) {
  new MDCChipSet(chipSetEl);
}

const BerriesTable = ({ berries }) => {
  const dispatch = useDispatch();
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [nameFilter, setNameFilter] = useState('');
  const applyNameFilter = () => {
    setIsFilterVisible(false);
  };
  const toggleFilter = () => {
    setIsFilterVisible(!isFilterVisible);
  };
  const setNameFilterValue = (e) => {
    setNameFilter(e.currentTarget.value);
  };
  const filterBerries = (berry) => nameFilter === '' || berry.name.toLowerCase().indexOf(nameFilter) !== -1;
  const berryCount = berries && berries.items.length;
  const filteredBerryCount = berries ? berries.items.filter(filterBerries).length : berryCount;
  return (
    <Table aria-label="Berries">
      <THead>
        <HeaderRow>
          <HeaderColumn colSpan={10} style={{ textAlign: 'center', fontSize: 'x-large' }}>
            Berries
            {berries && berryCount !== filteredBerryCount && (
              <span>{` [Showing ${filteredBerryCount} of total ${berryCount}]`}</span>
            )}
          </HeaderColumn>
        </HeaderRow>
        <HeaderRow>
          <HeaderColumn>
            <IconButton title="Filter Berries" onClick={() => dispatch(toggleFilter)}>
              <MaterialIcon icon="filter_list" />
            </IconButton>
          </HeaderColumn>
          {nameFilter !== '' && isFilterVisible === false && (
            <HeaderColumn colSpan={8}>
              <div className="mdc-chip-set mdc-chip-set--filter" role="grid">
                <div className="mdc-chip" role="row">
                  <div className="mdc-chip__ripple"></div>
                  <span className="mdc-chip__checkmark">
                    <svg className="mdc-chip__checkmark-svg" viewBox="-2 -3 30 30">
                      <path
                        className="mdc-chip__checkmark-path"
                        fill="none"
                        stroke="black"
                        d="M1.73,12.91 8.1,19.28 22.79,4.59"
                      />
                    </svg>
                  </span>
                  <span role="gridcell">
                    <span role="checkbox" tabIndex={0} aria-checked="false" className="mdc-chip__primary-action">
                      <span className="mdc-chip__text">Name contains {nameFilter}</span>
                    </span>
                  </span>
                </div>
              </div>
            </HeaderColumn>
          )}
          {isFilterVisible && (
            <>
              <HeaderColumn />
              <HeaderColumn>
                <TextField
                  dense
                  outlined
                  label="Name"
                  helperText={<HelperText>Search Name</HelperText>}
                  onTrailingIconSelect={() => {
                    applyNameFilter();
                  }}
                  trailingIcon={<MaterialIcon role="button" icon="search" />}
                >
                  <Input value={nameFilter} onChange={setNameFilterValue} />
                </TextField>
              </HeaderColumn>
            </>
          )}
        </HeaderRow>
        <HeaderRow>
          <HeaderColumn />
          <HeaderColumn sorted numeric title="The identifier for this resource.">
            ID
          </HeaderColumn>
          <HeaderColumn title="The name for this resource.">Name</HeaderColumn>
          <HeaderColumn
            numeric
            title="Time it takes the tree to grow one stage, in hours. Berry trees go through four of these growth stages before they can be picked."
          >
            Growth Time (hours)
          </HeaderColumn>
          <HeaderColumn numeric title="The maximum number of these berries that can grow on one tree in Generation IV.">
            Max / Tree
          </HeaderColumn>
          <HeaderColumn title="The firmness of this berry, used in making Pokéblocks or Poffins.">
            Firmness
          </HeaderColumn>
          <HeaderColumn numeric title="The size of this Berry, in millimeters.">
            Size (mm)
          </HeaderColumn>
          <HeaderColumn numeric title="The smoothness of this Berry, used in making Pokéblocks or Poffins.">
            Smoothness
          </HeaderColumn>
          <HeaderColumn
            numeric
            title="The speed at which this Berry dries out the soil as it grows. A higher rate means the soil dries more quickly."
          >
            Soil Dryness
          </HeaderColumn>
          <HeaderColumn title="The category of items this item falls into.">Category</HeaderColumn>
        </HeaderRow>
      </THead>
      <TBody>
        {berries &&
          berries.items
            .filter(filterBerries)
            .map((berry, index) => <BerryListItem key={index} berry={berry} index={index} />)}
      </TBody>
    </Table>
  );
};

export default BerriesTable;
