import React, { FC, useEffect, useState } from 'react';
import cx from 'classnames';

import styles from './pulse.module.scss';

export namespace Pulse {
  export type Props = Readonly<{
    duration?: number;
    trigger: string;
  }>

  export const $: FC<Props> = (props) => {
    const { trigger, duration = 3000 } = props;
    const [animate, setAnimate] = useState(false);

    useEffect(() => {
      let animationTimeout: number | undefined;

      window.clearTimeout(animationTimeout);
      setAnimate(true)

      animationTimeout = window.setTimeout(() => {
        setAnimate(false);
        window.clearTimeout(animationTimeout);
      }, duration);

      return () => window.clearTimeout(animationTimeout);
    }, [trigger, duration]);


    return (
      <div className={cx(styles.pulse, animate && styles.pulse_animated)} />
    )
  }
}

