import React from 'react';
// import classNames from 'classnames';

// import '@material/data-table/dist/mdc.data-table.css';
import '@material/checkbox/dist/mdc.checkbox.css';

const CLASS = 'mdc-checkbox';

const CheckboxNative = ({ ...props }) => (
  <input type="checkbox" className={`${CLASS}__native-control`} {...props} />
);

const Checkmark = () => (
  <svg className={`${CLASS}__checkmark`} viewBox="0 0 24 24">
    <path
      className={`${CLASS}__checkmark-path`}
      fill="none"
      d="M1.73,12.91 8.1,19.28 22.79,4.59"
    />
  </svg>
);

export const Checkbox = ({ ...props }) => (
  <>
    <CheckboxNative {...props} />
    <div className={`${CLASS}__background`}>
      <Checkmark />
      <div className={`${CLASS}__mixedmark`} />
    </div>
  </>
);
