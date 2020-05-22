import React from 'react';
import classNames from 'classnames';

import '@material/data-table/dist/mdc.data-table.css';

import { Checkbox } from './Checkbox';

const CLASS = 'mdc-data-table';

export const Cell = ({
  children,
  numeric = false,
  checkbox = false,
  checked = false,
  ...props
}) => (
  <td
    className={classNames(`${CLASS}__cell`, {
      [`${CLASS}__cell--numeric`]: numeric,
      [`${CLASS}__cell--checkbox`]: checkbox,
    })}
    {...props}
  >
    {checkbox ? (
      <div className={classNames('mdc-checkbox', `${CLASS}__row-checkbox`)}>
        <Checkbox aria-labelledby="u0" {...(checked && { checked: true })} />
      </div>
    ) : (
      children
    )}
  </td>
);

export const HeaderRow = ({ children }) => (
  <tr className={`${CLASS}__header-row`}>{children}</tr>
);

export const HeaderColumn = ({
  children,
  numeric = false,
  checkbox = false,
  sorted = false,
  ascending = true,
  ...props
}) => (
  <th
    className={classNames(`${CLASS}__header-cell`, {
      [`${CLASS}__header-cell--numeric`]: numeric,
      [`${CLASS}__header-cell--checkbox`]: checkbox,
    })}
    role="columnheader"
    scope="col"
    {...props}
  >
    {sorted && (
      <span className="material-icons" style={{ fontSize: '18px' }}>
        arrow_{ascending ? 'down' : 'up'}ward
      </span>
    )}
    {checkbox ? (
      <div
        className={classNames(
          `${CLASS}__header-row-checkbox`,
          'mdc-checkbox',
          'mdc-checkbox--selected'
        )}
      >
        <Checkbox aria-label="Checkbox for header row selection" />
      </div>
    ) : (
      children
    )}
  </th>
);

export const Row = ({ children, id, selected = false }) => (
  <tr
    data-row-id={id}
    className={classNames(`${CLASS}__row`, {
      [`${CLASS}__row--selected`]: selected,
    })}
    {...(selected && {
      'aria-selected': 'true',
    })}
  >
    {children}
  </tr>
);

export const THead = ({ children }) => <thead>{children}</thead>;

export const TBody = ({ children }) => (
  <tbody className={`${CLASS}__content`}>{children}</tbody>
);

const Table = ({ children, ...props }) => (
  <div className={CLASS}>
    <table className={`${CLASS}__table`} {...props}>
      {children}
    </table>
  </div>
);

export default Table;
