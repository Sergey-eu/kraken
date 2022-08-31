import React, { FC } from 'react';

import styles from './page.module.scss';

export namespace Page {
  export type Props = Readonly<{
    children: React.ReactNode
  }>

  export const $: FC<Props> = (props) => {
    const { children } = props;

    return (
      <main className={styles.page}>
        {children}
      </main>
    );
  };
}
