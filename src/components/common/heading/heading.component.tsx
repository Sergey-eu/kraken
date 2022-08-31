import React, { FC } from 'react';
import cx from 'classnames';

import styles from './heading.module.scss';

export namespace Heading {
  export type Props = Readonly<{
    level: Levels
    text?: string
    centered?: boolean
    thin?: boolean
    children?: React.ReactNode
    className?: string
  }>

  export enum Levels {
    h1 = 'h1',
    h2 = 'h2',
  }

  const headingStyleMapper = {
    [Levels.h1]: styles.heading_1,
    [Levels.h2]: styles.heading_2
  };

  export const $: FC<Props> = (props) => {
    const { level, text = '', centered, children, thin, className } = props;
    const classNames = cx(styles.heading, headingStyleMapper[level], centered && styles.heading_centered, thin && styles.heading_thin, className);

    return React.createElement(
      level,
      { className: classNames },
      children ?? text
    );
  };
}
