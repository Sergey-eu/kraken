import React, { FC } from 'react';
import { CheckIcon } from '../../../icons/check';

import styles from './checkbox.module.scss';

export namespace Checkbox {
  export type Props = Readonly<{
    label?: string
    checked: boolean
    onChange: () => void
  }>

  export const $: FC<Props> = (props) => {
    const { label, checked, onChange } = props;

    return (
      <label className={styles.checkbox} >
        <input type="checkbox" checked={checked} onChange={onChange} className={styles.checkbox__control} />
        <span className={styles.checkbox__icon}>
          {checked && <CheckIcon />}
        </span>
        <span className={styles.checkbox__label}>{label}</span>
      </label>
    );
  };
}
