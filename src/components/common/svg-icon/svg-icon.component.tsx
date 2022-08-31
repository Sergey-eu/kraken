import React, { FC, SVGProps } from 'react';
import classNames from 'classnames';

import styles from './svg-icon.module.scss';

export namespace SvgIcon {
  export enum Size {
    Small = 'small',
    Medium = 'medium',
  }

  export type Props = Readonly<{
    size?: Size
    viewBox?: string
  }> &
    SVGProps<SVGSVGElement>

  const sizeMap = {
    [Size.Small]: styles.svgIcon_small,
    [Size.Medium]: styles.svgIcon_medium
  };

  export const $: FC<Props> = (props) => {
    const { size = Size.Small, viewBox, ...rest } = props;
    const classes = classNames(styles.svgIcon, sizeMap[size]);

    return (
      <svg
        viewBox={viewBox}
        className={classes}
        xmlns="http://www.w3.org/2000/svg"
        {...rest}
      >
        {props.children}
      </svg>
    );
  };
}
