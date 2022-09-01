import React, { FC, useRef, useState } from 'react';
import cx from 'classnames';
import useOnClickOutside from '../../../hooks/useOnClickOutside';

import { Checkbox } from '../../common/checkbox';
import { SvgIcon } from '../../common/svg-icon';
import { CloseIcon } from '../../../icons/close';

import styles from './multi-select.module.scss';

export namespace MultiSelect {
  export type Props = Readonly<{
    options: readonly string[]
    selected?: string[]
    onChange: (markets: string[]) => void
  }>

  export const $: FC<Props> = (props) => {
    const { options, selected = [], onChange } = props;
    const selectElement = useRef<HTMLDivElement>(null);
    useOnClickOutside(selectElement, () => setOpened(false));

    const [opened, setOpened] = useState<boolean>(false);
    const [value, setValue] = useState<string[]>(selected);

    const selectClassNames = cx(
      styles.multiSelect,
      opened && styles.multiSelect_opened
    );

    const Tag: FC<{ market: string }> = ({ market }) => {
      const removeOptionHandler = () => {
        const val = [...value].filter(el => el !== market);
        setValue(val);
        onChange(val);
      };

      return (
        <button onClick={e => e.stopPropagation()} className={styles.multiSelect__tag}>
          {market}
          <span className={styles.multiSelect__tagRemove} onClick={removeOptionHandler}>
            <CloseIcon size={SvgIcon.Size.Small} />
          </span>
        </button>
      );
    };

    const Option: FC<{ market: string }> = ({ market }) => {
      const disabled = !selected.includes(market) && selected.length === 3;
      const optionChangeHandler = () => {
        const val = value.includes(market)
          ? [...value].filter(el => el !== market)
          : !disabled ? [...selected, market] : [...selected];
        setValue(val);
        onChange(val);
      };
      return (
        <div onClick={e => e.stopPropagation()} className={cx(styles.multiSelect__dropdownOption, disabled && styles.multiSelect__dropdownOption_disabled)} >
          <Checkbox.$ checked={selected.includes(market)} onChange={optionChangeHandler} label={market} />
        </div>
      );
    };

    return (
      <div className={selectClassNames} ref={selectElement} onClick={() => setOpened(!opened)}>
        {(selected.length > 0)
          ? selected.map(market => <Tag key={market} market={market} />)
          : 'Select currency pairs...'
        }
        <div className={styles.multiSelect__dropdown} >
          {options.map(option => <Option key={option} market={option} />)}
        </div>
      </div>
    );
  };
}
